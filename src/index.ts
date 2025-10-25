import config from "./helpers/config.js";
import { createApp } from "./app/app.js";
import { Options } from "./helpers/types.js";
import { customLog, fixHost } from "./helpers/utils.js";
import { redisFlushDb, redisConnect } from "./cache/redis.js";
import { createProgram } from "./app/program.js";

const DEFAULT_PORT = 7575;
const program = createProgram();

program.parse(process.argv);

const options: Options = program.opts();

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

const app = createApp();
const port = options.port || DEFAULT_PORT;

app.listen(port, () => {
  customLog("server", `Listening on port ${port}`);
});
