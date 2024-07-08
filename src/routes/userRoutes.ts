import { Elysia, t } from "elysia";
import { getUser, remove, update } from "../controllers/userController";

const userRoutes = new Elysia({ prefix: "/user" })
  .get(
    "/:id",
    async ({ set, headers: { authorization }, params }) =>
      await getUser(set, authorization, params),
    {
      headers: t.Object({
        authorization: t.String(),
      }),
      params: t.Object({
        id: t.String(),
      }),
    },
  )
  .put(
    "/:id",
    async ({ set, headers: { authorization }, body, params }) =>
      await update(set, authorization, params, body),
    {
      headers: t.Object({
        authorization: t.String(),
      }),
      params: t.Object({
        id: t.String(),
      }),
      body: t.Object({
        full_name: t.String(),
        email: t.String(),
        password: t.String(),
      }),
    },
  )
  .delete(
    "/:id",
    async ({ set, headers: { authorization }, params }) =>
      await remove(set, authorization, params),
    {
      headers: t.Object({
        authorization: t.String(),
      }),
      params: t.Object({
        id: t.String(),
      }),
    },
  );

export default userRoutes;
