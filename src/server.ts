import express from "express";
import "express-async-errors";
import swaggerUI from "swagger-ui-express";

import "reflect-metadata";
import { errorCatcher } from "./shared/infra/http/middlewares/errorCatcher";
import { router } from "./shared/routes";
import swaggerFile from "./swagger.json";
import "./database";
import "./shared/container";

const app = express();

// Enables usage of the json format in the body of the request
app.use(express.json());

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerFile));

app.use(router);

app.use(errorCatcher);

app.listen(3333, () => {
  console.log("Server running on 3333 port!");
});
