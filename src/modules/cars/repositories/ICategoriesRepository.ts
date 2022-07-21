import { Category } from "../infra/typeOrm/entities/Category";

export interface ICategoriesRepository {
  create(name: string, description: string): Promise<void>;
  findByName(name: string): Promise<Category | null>;
  list(): Promise<Category[]>;
}
