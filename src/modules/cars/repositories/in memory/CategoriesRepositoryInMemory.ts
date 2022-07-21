import { Category } from "../../infra/typeOrm/entities/Category";
import { ICategoriesRepository } from "../ICategoriesRepository";

export class CategoriesRepositoryInMemory implements ICategoriesRepository {
  private categories: Category[] = [];

  public async create(name: string, description: string): Promise<void> {
    const category = new Category(name, description);

    this.categories.push(category);
  }

  public async findByName(name: string): Promise<Category | null> {
    const category = this.categories.find((category) => {
      return category.name === name;
    });

    if (!category) {
      return null;
    }

    return category;
  }
  public async list(): Promise<Category[]> {
    return this.categories;
  }
}
