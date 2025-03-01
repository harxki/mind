import { serve } from "@hono/node-server";
import { Hono } from "hono";
import post from "./gateway/post/post";

const app = new Hono();

const routes = app.route("/posts", post);

export type AppType = typeof routes;

serve(
  {
    fetch: app.fetch,
    port: 8080,
  },
  (info) => {
    console.log(`Server is running on http://localhost:${info.port}`);
  }
);
