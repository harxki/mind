import { Link } from "react-router";
import { parseConfig } from "~/domain/config/config";
import type { Route } from "./+types/home";
import { createApiClient } from "~/lib/apiClient";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export async function loader({ context }: Route.LoaderArgs) {
  const config = parseConfig({ API_URL: context.cloudflare.env.API_URL });
  const client = createApiClient(config);

  const postsResponse = await client.posts.$get();

  if (postsResponse.ok === false) {
    throw new Error("Failed to fetch posts");
  }

  const posts = await postsResponse.json();

  return { posts };
}

export default function Home({ loaderData }: Route.ComponentProps) {
  return (
    <div>
      <h1>Home</h1>
      <ul>
        {loaderData.posts.map((post) => (
          <li key={post.id}>
            <Link to={`/posts/${post.id}`}>{post.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
