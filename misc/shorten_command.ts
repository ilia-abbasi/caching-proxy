import { exec } from "node:child_process";
import { writeFileSync } from "node:fs";

const content = `#!/bin/bash
npm run start -- "$@"
`;

try {
  writeFileSync("caching-proxy", content);
} catch (error) {
  if (error instanceof Error) {
    console.log('An error occured while writing to "caching-proxy":');
    console.log(error.message);
  }
  process.exit(1);
}

exec("chmod 700 caching-proxy", (err, stdout, stderr) => {
  if (err) {
    console.log('Failed to make "caching-proxy" executable.');
    console.log(stderr);

    process.exit(1);
  }

  console.log(stdout);
});
