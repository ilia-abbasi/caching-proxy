import { Command } from "commander";
import packageData from "../package.json";
const program = new Command();

program
  .name(packageData.name)
  .description(packageData.description)
  .version(packageData.version);

program
  .option("-p, --port <port-number>", "Port number to listen on")
  .argument("<host>", "The host to cache responses from");

program.parse();

const options = program.opts();

console.log(options);
console.log(program.args);
