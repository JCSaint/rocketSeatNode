import { AppError } from "../../../../shared/errors/AppError";
import { UsersRepositoryInMemory } from "../../repositories/in memory/UsersRepositoryInMemory";
import { CreateUserUseCase } from "../createUser/CreateUserUseCase";
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";

let authenticateUserUseCase: AuthenticateUserUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let createUserUseCase: CreateUserUseCase;

describe("Authenticate User", () => {
  beforeEach(async () => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    authenticateUserUseCase = new AuthenticateUserUseCase(
      usersRepositoryInMemory
    );

    createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
  });

  it("should be able to authenticate a user", async () => {
    await createUserUseCase.execute(
      "Jean",
      "123456",
      "email@email.com",
      "12345678"
    );

    const authResponse = await authenticateUserUseCase.execute(
      "email@email.com",
      "123456"
    );

    expect(authResponse).toHaveProperty("token");
  });

  it("should not be to authenticate non existent user", async () => {
    expect(async () => {
      await authenticateUserUseCase.execute("false_email@email.com", "123456");
    }).rejects.toBeInstanceOf(AppError);
  });

  it("should not be able to authenticate with incorrect password", () => {
    expect(async () => {
      await createUserUseCase.execute(
        "Jean",
        "123456",
        "email@email.com",
        "12345678"
      );

      await authenticateUserUseCase.execute("email@email.com", "123456789");
    }).rejects.toBeInstanceOf(AppError);
  });
});
