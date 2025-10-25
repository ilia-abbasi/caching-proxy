import { exec } from "node:child_process";
import { writeFileSync } from "node:fs";

import { getOsName } from "../src/helpers/utils.js";

const linContent = `#!/bin/bash
npm run start -- "$@"
`;

const winContent = `@echo off
npm run start -- -- %*
`;

const osName = getOsName();
let fileName = "";
let content = "";

if (osName === "lin") {
  fileName = "caching-proxy";
  content = linContent;
}
if (osName === "win") {
  fileName = "caching-proxy.bat";
  content = winContent;
}
if (osName === "none") {
  console.log("Failed to identify OS or you are using Mac");
  process.exit(1);
}

try {
  writeFileSync(fileName, content);
} catch (error) {
  if (error instanceof Error) {
    console.log('An error occured while writing to "caching-proxy":');
    console.log(error.message);
  }
  process.exit(1);
}

if (osName === "win") {
  process.exit(0);
}

exec("chmod 700 caching-proxy", (err, stdout, stderr) => {
  if (err) {
    console.log('Failed to make "caching-proxy" executable.');
    console.log(stderr);

    process.exit(1);
  }

  console.log(stdout);
});
