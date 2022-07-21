import { Request, Response, NextFunction } from "express";

import { AppError } from "../../../errors/AppError";

export function errorCatcher(
  err: Error,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction
) {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({ message: err.message });
  }

  return res.status(500).json({
    status: "error",
    message: `Internal server error: ${err.message}`,
  });
}
