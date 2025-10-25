import express from "express";
import { Application } from "express-serve-static-core";
import morgan from "morgan";

import mainRouter from "../routes/main.js";

morgan.token("time-only", () => {
  return new Date().toTimeString().split(" ")[0];
});

export function createApp(): Application {
  const app: Application = express();

  app.use(
    morgan("(:time-only) [MORGAN] :method :url :status - :response-time ms")
  );

  app.use(mainRouter);

  return app;
}
