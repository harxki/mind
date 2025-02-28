import { Hono } from "hono";
import post from "../post/post";

const app = new Hono();

const routes = app.route("/posts", post);

export default app;
export type AppType = typeof routes;
