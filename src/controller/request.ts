import { NextFunction, Request, Response } from "express-serve-static-core";

import config from "../helpers/config.js";
import { redisGet, redisSet } from "../cache/redis.js";
import { customLog } from "../helpers/utils.js";
import { ResponseObj } from "../helpers/types.js";

export async function requestHandler(
  req: Request,
  res: Response,
  _next: NextFunction
) {
  const reqUrl = `${config.host}${req.path}`;
  const cachedResponse = await redisGet(reqUrl);

  if (cachedResponse && req.method === "GET") {
    const responseObj: ResponseObj = JSON.parse(cachedResponse as string);

    customLog("server", "HIT");

    res.set("Cache", "HIT");
    res.set("Content-Type", responseObj.contentType);

    return res.status(200).send(responseObj.body);
  }

  try {
    const response = await fetch(reqUrl);
    const responseObj: ResponseObj = {
      contentType: response.headers.get("content-type")!,
      body: await response.text(),
    };

    if (response.status < 400) {
      await redisSet(reqUrl, JSON.stringify(responseObj), 60 * 15);
    }

    customLog("server", "MISS");

    res.set("Cache", "MISS");
    res.set("Content-Type", responseObj.contentType);

    return res.status(response.status).send(responseObj.body);
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
      console.log(error.stack);
    }

    return res.status(500).send(`Failed to fetch data from ${config.host}`);
  }
}
