//* libraries imports
import { Elysia, t } from 'elysia';

//* Local imports
import { UserModel } from "../models/user.model";

const users = new Elysia()
  .group("/users", (app) =>
    app
      .get(
        '/',
        async () => {
          return await UserModel.index();
        }
      )

      .get(
        '/:id',
        async (req) => {
          return await UserModel.show(req.params.id);
        },
        {
          params: t.Object({
            id: t.Number()
          })
        }
      )

      .post(
        '/',
        async (req) => {
          return await UserModel.store(req.body);
        },
        {
          body: UserModel.createUser
        }
      )

      .put(
        '/:id',
        async (req) => {
          return await UserModel.update(req.params.id, req.body);
        },
        {
          body: UserModel.updateUser,
          params: t.Object({
            id: t.Number()
          })
        }
      )

      .delete(
        '/:id',
        async (req) => {
          return await UserModel.delete(req.params.id);
        },
        {
          params: t.Object({
            id: t.Number()
          })
        }
      )
  );

export { users };