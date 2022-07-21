import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

import { UsersRepository } from "../../../../modules/accounts/infra/typeOrm/repositories/UsersRepository";
import { AppError } from "../../../errors/AppError";

interface IPayload {
  sub: string;
}

export async function ensureAuthentication(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    throw new AppError("Token missing", 401);
  }

  const [, token] = authHeader.split(" ");

  try {
    const { sub: id } = verify(
      token,
      "6510fef41defc6faaca6d8797e3371f5"
    ) as IPayload;

    const usersRepository = new UsersRepository();

    const user = await usersRepository.findById(id);

    if (!user) {
      throw new AppError("User does not exist", 401);
    }

    req.user = {
      id: user.id,
    };

    next();
  } catch (error) {
    throw new AppError("Invalid token", 401);
  }
}
