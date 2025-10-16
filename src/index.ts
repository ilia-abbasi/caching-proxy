import { Command } from "commander";

import packageData from "../package.json";
import config from "./helpers/config.js";
import { createApp } from "./app/app.js";
import { Options } from "./helpers/types.js";

const DEFAULT_PORT = 7575;
const program = new Command();

program
  .name(packageData.name)
  .description(packageData.description)
  .version(packageData.version);

program
  .option(
    "-p, --port <port-number>",
    "Port number to listen on",
    parseInt,
    DEFAULT_PORT
  )
  .argument("<host>", "The host to cache responses from");

program.parse();
config.host = program.args[0]!;

const options: Options = program.opts();
const app = createApp();
const port = options.port;

app.listen(() => {
  console.log(`Listening on port ${port}`);
});
