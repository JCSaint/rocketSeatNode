import { hash } from "bcrypt";
import { inject, injectable } from "tsyringe";

import { AppError } from "../../../../shared/errors/AppError";
import {
  IUsersRepository,
  ICreateUserDTO,
} from "../../repositories/IUsersRepository";

@injectable()
export class CreateUserUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}

  public async execute(
    name: string,
    password: string,
    email: string,
    driver_license: string
  ): Promise<void> {
    const hashedPassword = await hash(password, 8);

    const userAlreadyExists = await this.usersRepository.findByEmail(email);

    if (userAlreadyExists) {
      throw new AppError("User already exists");
    }

    await this.usersRepository.create({
      name,
      email,
      driver_license,
      password: hashedPassword,
    } as ICreateUserDTO);
  }
}
