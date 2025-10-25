import { Command } from "commander";
import { readFileSync } from "node:fs";

import { PackageData } from "../helpers/types.js";

const packageData: PackageData = JSON.parse(
  readFileSync("package.json", "utf-8")
);

export function createProgram(): Command {
  const program = new Command();

  program
    .name(packageData.name)
    .description(packageData.description)
    .version(packageData.version);

  program
    .option("-C, --clear-cache", "Clear all cache from redis")
    .option("-p, --port <port-number>", "Port number to listen on", parseInt)
    .option("-o, --origin <host>", "The host to cache responses from");

  return program;
}
