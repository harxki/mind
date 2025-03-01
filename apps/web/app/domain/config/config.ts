import * as v from "valibot";

export type Config = {
  API_URL: string;
};

const ConfigSchema = v.object({
  API_URL: v.string(),
});

export const parseConfig = (config: Record<string, string>): Config => {
  return v.parse(ConfigSchema, config);
};
