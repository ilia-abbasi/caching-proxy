import { Command } from "commander";
const program = new Command();
console.log(process.argv);

program
  .option("-p, --port <port_number>", "Port number to listen on")
  .argument("<host>", "The host to cache responses from");

const options = program.opts();

console.log(options);
console.log(program.args);
