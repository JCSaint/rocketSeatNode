import { AppError } from "../../../../shared/errors/AppError";
import { CategoriesRepositoryInMemory } from "../../repositories/in memory/CategoriesRepositoryInMemory";
import { CreateCategoryUseCase } from "./CreateCategoryUseCase";

let createCategoryUseCase: CreateCategoryUseCase;
let categoriesRepositoryInMemory: CategoriesRepositoryInMemory;

describe("Create category", () => {
  beforeEach(() => {
    categoriesRepositoryInMemory = new CategoriesRepositoryInMemory();
    createCategoryUseCase = new CreateCategoryUseCase(
      categoriesRepositoryInMemory
    );
  });

  it("should be able to create a new category", async () => {
    await createCategoryUseCase.execute("test name", "test description");

    const categoryCreated = await categoriesRepositoryInMemory.findByName(
      "test name"
    );

    expect(categoryCreated).toHaveProperty("id");
  });

  it("should not be able to create a new category with a name that is already taken", async () => {
    expect(async () => {
      await createCategoryUseCase.execute("test name", "test description");

      await createCategoryUseCase.execute("test name", "test description");
    }).rejects.toBeInstanceOf(AppError);
  });
});
