import { Hono } from "hono";
import { prisma } from "../../lib/database/database";

const app = new Hono()
  .get("/", async (c) => {
    const posts = await prisma.post.findMany();

    return c.json(posts);
  })
  .get("/:id", async (c) => {
    const { id } = c.req.param();
    const post = await prisma.post.findUnique({
      where: { id },
    });

    return c.json(post);
  });

export default app;
