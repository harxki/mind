import { hc } from "hono/client";
export const createApiClient = (config) => {
    const client = hc(config.API_URL);
    return client;
};
