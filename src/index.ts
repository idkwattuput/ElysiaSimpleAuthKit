import { Elysia } from "elysia";
import { cors } from "@elysiajs/cors";
import authRoutes from "./routes/authRoutes";
import userRoutes from "./routes/userRoutes";

const app = new Elysia()
  .use(cors())
  .group(`/api/v1`, (app) => app.use(authRoutes).use(userRoutes))
  .listen(8000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`,
);
