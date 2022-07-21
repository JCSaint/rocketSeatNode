import { Router } from "express";

import { CreateSpecificationController } from "../../modules/cars/useCases/createSpecification/CreateSpecificationController";
import { ensureAuthentication } from "../infra/http/middlewares/ensureAuthentication";

const specificationsRouter = Router();

const createSpecificationController = new CreateSpecificationController();

specificationsRouter.use(ensureAuthentication);

specificationsRouter.post("/", createSpecificationController.handle);

export { specificationsRouter };
