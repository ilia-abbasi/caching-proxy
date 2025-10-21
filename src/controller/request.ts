import { NextFunction, Request, Response } from "express-serve-static-core";

import config from "../helpers/config.js";
import { redisGet, redisSet } from "../cache/redis";
import { customLog } from "../helpers/utils.js";

export async function requestHandler(
  req: Request,
  res: Response,
  _next: NextFunction
) {
  const reqUrl = `${config.host}${req.path}`;
  const cachedResponseBody = await redisGet(reqUrl);

  if (cachedResponseBody && req.method === "GET") {
    customLog("server", "HIT");

    res.set("Cache", "HIT");
    return res.status(200).send(cachedResponseBody);
  }

  try {
    const response = await fetch(reqUrl);
    const responseBody = await response.text();

    if (response.status < 400) {
      await redisSet(reqUrl, responseBody, 60 * 15);
    }

    customLog("server", "MISS");

    res.set("Cache", "MISS");
    return res.status(response.status).send(responseBody);
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
      console.log(error.stack);
    }

    return res.status(500).send(`Failed to fetch data from ${config.host}`);
  }
}
