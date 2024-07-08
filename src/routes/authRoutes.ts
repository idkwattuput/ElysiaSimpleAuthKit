import { Elysia, t } from "elysia";
import {
  getAccessTokenByRefreshToken,
  login,
  register,
} from "../controllers/authController";

const authRoutes = new Elysia({ prefix: "/auth" })
  .post("/login", async ({ set, body }) => await login(set, body), {
    body: t.Object({
      email: t.String(),
      password: t.String(),
    }),
  })
  .post("/register", async ({ set, body }) => await register(set, body), {
    body: t.Object({
      full_name: t.String(),
      email: t.String(),
      password: t.String(),
    }),
  })
  .post(
    "/refresh",
    async ({ set, cookie }) => await getAccessTokenByRefreshToken(set, cookie),
  );

export default authRoutes;
