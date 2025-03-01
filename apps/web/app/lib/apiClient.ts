import { hc } from "hono/client";
import type { AppType } from "server";
import type { Config } from "~/domain/config/config";

export const createApiClient = (config: Config) => {
  const client = hc<AppType>(config.API_URL);

  return client;
};
