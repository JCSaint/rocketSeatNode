import { User } from "../infra/typeOrm/entities/User";

interface ICreateUserDTO {
  id?: string;
  avatar?: string;
  name: string;
  password: string;
  email: string;
  driver_license: string;
}

interface IUsersRepository {
  create(dto: ICreateUserDTO): Promise<void>;

  findByEmail(email: string): Promise<User | null>;

  findById(id: string): Promise<User | null>;
}

export { IUsersRepository, ICreateUserDTO };
