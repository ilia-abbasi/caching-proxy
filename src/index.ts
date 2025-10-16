import { Command } from "commander";

import packageData from "../package.json";
import config from "./helpers/config.js";
import { createApp } from "./app/app.js";

const program = new Command();

program
  .name(packageData.name)
  .description(packageData.description)
  .version(packageData.version);

program
  .option("-p, --port <port-number>", "Port number to listen on")
  .argument("<host>", "The host to cache responses from");

program.parse();
config.host = program.args[0]!;

const options = program.opts();
