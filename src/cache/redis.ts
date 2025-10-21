import redis, { RedisClientType } from "redis";

import { customLog } from "../helpers/utils.js";
import { RedisValue } from "../helpers/types.js";

let redisClient: RedisClientType<any, any, any, any, any>;

export async function redisConnect() {
  const redisUrl = process.env.REDIS_URL!;

  redisClient = await redis
    .createClient({ url: redisUrl })
    .on("connect", () => customLog("redis", "Connected"))
    .on("error", (err) =>
      console.log(`Redis: An error occurred while trying to connect: ${err}`)
    )
    .connect();
}

export async function redisSet(key: string, value: RedisValue, expiration = 0) {
  if (expiration <= 0) {
    console.log(
      `Redis: REFUSED to set (${key}/${value}) pair because an expiration was not provided`
    );
    return;
  }

  if (value === null) {
    value = 0;
  }

  try {
    await redisClient.set(key, value, { EX: expiration });
  } catch (err) {
    console.log(
      `Redis: An error occurred while setting (${key}/${value}) pair:`
    );
    console.log(err);
  }
}

export async function redisGet(key: string) {
  try {
    const value = await redisClient.get(key);
    return value;
  } catch (err) {
    console.log(`Redis: An error occurred while getting (${key}):`);
    console.log(err);
    return false;
  }
}
