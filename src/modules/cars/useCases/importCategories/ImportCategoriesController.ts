import { Request, Response } from "express";
import { container } from "tsyringe";

import { ImportCategoryUseCase } from "./ImportCategoriesUseCase";

export class ImportCategoriesController {
  public async handle(req: Request, res: Response) {
    const { file } = req;
    if (!file) {
      return res.status(400).send("File not sent!");
    }

    const importCategoriesUseCase = container.resolve(ImportCategoryUseCase);

    await importCategoriesUseCase.execute(file);
    return res.status(201).send();
  }
}
