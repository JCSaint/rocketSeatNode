import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";

import { AppError } from "../../../../shared/errors/AppError";
import { IUsersRepository } from "../../repositories/IUsersRepository";

interface IResponse {
  user: {
    name: string;
    email: string;
  };
  token: string;
}

@injectable()
export class AuthenticateUserUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}

  public async execute(email: string, password: string): Promise<IResponse> {
    // Usuário existe
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError("Invalid email or invalid password", 401);
    }

    // Senha está correta
    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      throw new AppError("Invalid email or invalid password", 401);
    }

    const token = sign({}, "6510fef41defc6faaca6d8797e3371f5", {
      subject: user.id,
      expiresIn: "1d",
    });

    const userName = user.name;
    const userEmail = user.email;

    // gerar jwt

    return {
      user: {
        name: userName,
        email: userEmail,
      },
      token,
    } as IResponse;
  }
}
