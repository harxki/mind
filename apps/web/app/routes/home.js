import { jsx as _jsx, jsxs as _jsxs } from "hono/jsx/jsx-runtime";
import { Link } from "react-router";
import { parseConfig } from "~/domain/config/config";
import { createApiClient } from "~/lib/apiClient";
export function meta({}) {
    return [
        { title: "New React Router App" },
        { name: "description", content: "Welcome to React Router!" },
    ];
}
export async function loader({ context }) {
    const config = parseConfig({ API_URL: context.cloudflare.env.API_URL });
    const client = createApiClient(config);
    const postsResponse = await client.posts.$get();
    if (postsResponse.ok === false) {
        throw new Error("Failed to fetch posts");
    }
    const posts = await postsResponse.json();
    return { posts };
}
export default function Home({ loaderData }) {
    return (_jsxs("div", { children: [_jsx("h1", { children: "Home" }), _jsx("ul", { children: loaderData.posts.map((post) => (_jsx("li", { children: _jsx(Link, { to: `/posts/${post.id}`, children: post.title }) }, post.id))) })] }));
}
