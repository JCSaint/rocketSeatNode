import { parse as csvParse } from "csv-parse";
import fs from "fs";
import { injectable, inject } from "tsyringe";

import { ICategoriesRepository } from "../../repositories/ICategoriesRepository";

interface IImportCategory {
  name: string;
  description: string;
}

@injectable()
export class ImportCategoryUseCase {
  constructor(
    @inject("CategoriesRepository")
    private categoriesRepository: ICategoriesRepository
  ) {}

  private loadCategories(
    file: Express.Multer.File
  ): Promise<IImportCategory[]> {
    return new Promise((resolve, reject) => {
      const loadedCategories: IImportCategory[] = [];

      const stream = fs.createReadStream(file.path);

      const parsedFile = csvParse();

      stream.pipe(parsedFile);

      parsedFile
        .on("data", async (line: string[]) => {
          const [name, description] = line;

          loadedCategories.push({
            name,
            description,
          });
        })
        .on("end", () => {
          fs.promises.unlink(file.path);
          resolve(loadedCategories);
        })
        .on("error", (err) => {
          reject(err);
        });
    });
  }

  public async execute(file: Express.Multer.File): Promise<void> {
    const categories = await this.loadCategories(file);
    categories.map(async (category) => {
      const { name, description } = category;

      const categoryAlreadyExists = await this.categoriesRepository.findByName(
        name
      );

      if (!categoryAlreadyExists) {
        await this.categoriesRepository.create(name, description);
      }
    });
  }
}
