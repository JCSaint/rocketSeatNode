import { User } from "../../infra/typeOrm/entities/User";
import { ICreateUserDTO, IUsersRepository } from "../IUsersRepository";

export class UsersRepositoryInMemory implements IUsersRepository {
  users: User[] = [];

  public async create({
    name,
    email,
    password,
    driver_license,
  }: ICreateUserDTO): Promise<void> {
    const user = new User(name, password, email, driver_license);

    this.users.push(user);
  }

  public async findByEmail(email: string): Promise<User | null> {
    const user = this.users.find((user) => {
      return user.email === email;
    });

    if (!user) {
      return null;
    }

    return user;
  }

  public async findById(id: string): Promise<User | null> {
    const user = this.users.find((user) => {
      return user.id === id;
    });

    if (!user) {
      return null;
    }

    return user;
  }
}
