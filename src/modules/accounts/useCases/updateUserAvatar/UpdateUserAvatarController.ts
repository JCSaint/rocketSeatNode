import { Request, Response } from "express";
import { container } from "tsyringe";

import { AppError } from "../../../../shared/errors/AppError";
import { UpdateUserAvatarUseCase } from "./UpdateUserAvatarUseCase";

export class UpdateUserAvatarController {
  public async handle(req: Request, res: Response): Promise<Response> {
    const { id } = req.user;

    if (!req.file) {
      throw new AppError("No image received");
    }

    const avatarFile = req.file.filename;

    const updateUserAvatarUseCase = container.resolve(UpdateUserAvatarUseCase);

    await updateUserAvatarUseCase.execute(id, avatarFile);

    return res.status(204).send();
  }
}
