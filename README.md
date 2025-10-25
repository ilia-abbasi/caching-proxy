# caching-proxy

**The project assignment for roadmap.sh**

URL of the assignment in roadmap.sh:  
https://roadmap.sh/projects/caching-server

This CLI app starts a server that caches responses from the origin.  
The origin host and the port that this app listens on is read from the command
line options.  
caching-proxy saves cached responses in [redis](https://redis.io).

## Installation

1. Clone the repository:

   ```sh
   git clone https://github.com/ilia-abbasi/caching-proxy.git
   cd caching-proxy
   ```

2. Install dependencies:

   ```sh
   npm install
   ```

3. Create the `.env` file inside the `./misc` directory and set the variables:

   ```env
   REDIS_URl=redis://127.0.0.1:6379
   ```

## Usage

1. Build the project:

   ```sh
   npm run build
   ```

2. Run the server with:

   ```sh
   npm run start -- -- --port 4000 --origin example.com # This works on my machine
   npm run start -- --port 4000 --origin example.com # This is what internet says works
   ```

3. You can also run the server using the file created by `./misc/shorten_command.ts`:

   ```sh
   ./caching-proxy --port 4000 --origin example.com
   ```

4. Send requests using [Postman](https://www.postman.com/) or your desired browser.

## Options

- `-V, --version`:  
    Output the version number.

- `-h, --help`:  
    Display help for command.

- `-p, --port <port-number>`:  
    The port number which caching-proxy will be listening on. Default is `7575`.

- `-o, --origin <host>`:  
    The host which the requests will be redirected to, and the host which its responses will be cached. Either this option or `--clear-cache` must be provided.

- `-C, --clear-cache`:  
    Clears all cache stored in redis. Either this option or `--origin` must be provided. This option overrides `--origin`.

## Testing

Testing is done with [jest](https://jestjs.io/).

- Run all the tests with:

  ```sh
  npm run test
  ```

- Run unit tests with:

  ```sh
  npm run test:units
  ```

E2E tests will be implemented later so there will be a difference between these two commands.

## Dependencies

- commander
- dotenv
- express
- morgan
- redis

### Dev dependencies

- @types/dotenv
- @types/express
- @types/jest
- @types/morgan
- @types/node
- @types/redis
- jest
- nodemon
- ts-jest
- tsx
- typescript

The source code is formatted with [Prettier](https://prettier.io/).

---

caching-proxy is licensed under the
[GPL-3.0 license](https://github.com/ilia-abbasi/caching-proxy/blob/main/LICENSE).
