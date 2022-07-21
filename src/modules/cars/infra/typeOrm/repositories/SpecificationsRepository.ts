import { getRepository, Repository } from "typeorm";

import { ISpecificationsRepository } from "../../../repositories/ISpecificationsRepository";
import { Specification } from "../entities/Specification";

interface IEntityWrapper {
  name: string;
  description: string;
}

export class SpecificationsRepository implements ISpecificationsRepository {
  private repository: Repository<Specification>;

  constructor() {
    this.repository = getRepository(Specification);
  }

  public async create(name: string, description: string): Promise<void> {
    const specification = this.repository.create({
      name,
      description,
    } as IEntityWrapper);

    await this.repository.save(specification);
  }

  public async findByname(name: string): Promise<Specification | null> {
    const specification = await this.repository.findOne({ name });

    if (!specification) {
      return null;
    }

    return specification;
  }

  public async list(): Promise<Specification[]> {
    const specifications = await this.repository.find();

    return specifications;
  }
}
