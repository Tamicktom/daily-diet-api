//* libraries imports
import { Elysia, t } from 'elysia';
import { eq } from 'drizzle-orm';

//* Local imports
import { db, Schema } from "../db";

const createUser = t.Object({
  name: t.String({ minLength: 3, maxLength: 255, error: 'Name is required' }),
  email: t.String({ format: 'email', error: 'Email is required' }),
  age: t.Number({ minimum: 18, maximum: 255, error: 'Age is required' }),
  password: t.String({ minLength: 8, maxLength: 255, error: 'Password is required' }),
});

const users = new Elysia()
  .group("/users", (app) =>
    app
      .get(
        '/',
        async () => {
          const users = await db
            .select()
            .from(Schema.usersTable);
          return users;
        }
      )

      .get(
        '/:id',
        async ({ params }) => {
          const user = await db
            .select()
            .from(Schema.usersTable)
            .where(eq(Schema.usersTable.id, params.id));

          return user;
        },
        {
          params: t.Object({
            id: t.Number()
          })
        }
      )

      .post(
        '/',
        async ({ body }) => {
          const user = await db
            .insert(Schema.usersTable)
            .values({
              name: body.name,
              email: body.email,
              age: body.age,
              password: body.password
            })
            .returning({ id: Schema.usersTable.id });

          return user;
        },
        {
          body: createUser
        }
      )

      .put(
        '/:id',
        async ({ body, params }) => {
          const user = await db
            .update(Schema.usersTable)
            .set({
              name: body.name,
              email: body.email,
              age: body.age,
              password: body.password
            })
            .where(eq(Schema.usersTable.id, params.id))
            .returning({ id: Schema.usersTable.id });

          return user;
        },
        {
          body: createUser,
          params: t.Object({
            id: t.Number()
          })
        }
      )

      .delete(
        '/:id',
        async ({ params }) => {
          const user = await db
            .delete(Schema.usersTable)
            .where(eq(Schema.usersTable.id, params.id))
            .returning({ id: Schema.usersTable.id });

          return user;
        },
        {
          params: t.Object({
            id: t.Number()
          })
        }
      )
  );

export { users };