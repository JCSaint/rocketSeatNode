import { getRepository, Repository } from "typeorm";

import { ICategoriesRepository } from "../../../repositories/ICategoriesRepository";
import { Category } from "../entities/Category";

interface IEntityWrapper {
  name: string;
  description: string;
}

export class CategoriesRepository implements ICategoriesRepository {
  // eslint-disable-next-line no-use-before-define

  private repository: Repository<Category>;

  constructor() {
    this.repository = getRepository(Category);
  }

  public async create(name: string, description: string): Promise<void> {
    const category = this.repository.create({
      name,
      description,
    } as IEntityWrapper);

    await this.repository.save(category);
  }

  public async list(): Promise<Category[]> {
    const categories = await this.repository.find();
    return categories;
  }

  public async findByName(name: string): Promise<Category | null> {
    const category = await this.repository.findOne({ name });

    if (!category) {
      return null;
    }

    return category;
  }
}
