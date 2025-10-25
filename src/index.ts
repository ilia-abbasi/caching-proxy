import { Command } from "commander";
import { readFileSync } from "node:fs";

import config from "./helpers/config.js";
import { createApp } from "./app/app.js";
import { Options, PackageData } from "./helpers/types.js";
import { customLog, fixHost } from "./helpers/utils.js";
import { redisFlushDb, redisConnect } from "./cache/redis.js";

const DEFAULT_PORT = 7575;
const program = new Command();
const packageData: PackageData = JSON.parse(
  readFileSync("package.json", "utf-8")
);

program
  .name(packageData.name)
  .description(packageData.description)
  .version(packageData.version);

program
  .option("-C, --clear-cache", "Clear all cache from redis")
  .option("-p, --port <port-number>", "Port number to listen on", parseInt)
  .option("-o, --origin <host>", "The host to cache responses from");

program.parse(process.argv);

const options: Options = program.opts();
const app = createApp();
const port = options.port || DEFAULT_PORT;

if (!options.origin && !options.clearCache) {
  console.log(
    'ERROR: Either "--origin <host>" or "--clear-cache" options must be provided'
  );

  process.exit(1);
}

await redisConnect();

if (options.clearCache) {
  await redisFlushDb();
  console.log("Flushed database.");

  process.exit(0);
}

config.host = fixHost(options.origin!);

app.listen(port, () => {
  customLog("server", `Listening on port ${port}`);
});
