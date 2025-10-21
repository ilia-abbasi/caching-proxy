import { NextFunction, Request, Response } from "express-serve-static-core";

import { redisGet } from "../cache/redis";

export function requestHandler(
  req: Request,
  _res: Response,
  _next: NextFunction
) {
  const cachedResponse = redisGet(req.path);
}
