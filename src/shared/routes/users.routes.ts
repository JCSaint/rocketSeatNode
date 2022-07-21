import { Router } from "express";
import multer from "multer";

import uploadConfig from "../../config/upload";
import { CreateUserController } from "../../modules/accounts/useCases/createUser/CreateUserController";
import { UpdateUserAvatarController } from "../../modules/accounts/useCases/updateUserAvatar/UpdateUserAvatarController";
import { ensureAuthentication } from "../infra/http/middlewares/ensureAuthentication";

const usersRouter = Router();

const uploadAvatar = multer(uploadConfig.upload("./tmp/avatar"));

const createUserController = new CreateUserController();
const updateUserAvatarController = new UpdateUserAvatarController();

usersRouter.post("/", createUserController.handle);

usersRouter.patch(
  "/avatar",
  ensureAuthentication,
  uploadAvatar.single("avatar"),
  updateUserAvatarController.handle
);

export { usersRouter };
