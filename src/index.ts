//* Libraries imports
import { Elysia } from 'elysia';
import { node } from '@elysiajs/node';
import { swagger } from '@elysiajs/swagger';
import { staticPlugin } from '@elysiajs/static';

//* Controllers imports
import { users } from "./controllers";

const elysia = new Elysia({ adapter: node() });

elysia
  .use(swagger())
  .use(staticPlugin())
  .use(users)
  .get('/', () => 'Hello Elysia')
  .listen(3000, ({ hostname, port }) => {
    console.log(
      `🦊 Elysia is running at ${hostname}:${port}`
    )
  });