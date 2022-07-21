import { Specification } from "../infra/typeOrm/entities/Specification";

export interface ISpecificationsRepository {
  create(name: string, description: string): Promise<void>;
  findByname(name: string): Promise<Specification | null>;
  list(): Promise<Specification[]>;
}
