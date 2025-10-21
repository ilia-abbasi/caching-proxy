import { Command } from "commander";
import { readFileSync } from "fs";

import config from "./helpers/config.js";
import { createApp } from "./app/app.js";
import { Options, PackageData } from "./helpers/types.js";
import { customLog } from "./helpers/utils.js";
import { redisConnect } from "./cache/redis.js";

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
  .option("-p, --port <port-number>", "Port number to listen on", parseInt)
  .argument("<host>", "The host to cache responses from");

program.parse(process.argv);
config.host = program.args[0]!;

const options: Options = program.opts();
const app = createApp();
const port = options.port || DEFAULT_PORT;

await redisConnect();

app.listen(port, () => {
  customLog("server", `Listening on port ${port}`);
});
