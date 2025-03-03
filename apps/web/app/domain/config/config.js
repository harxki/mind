import * as v from "valibot";
const ConfigSchema = v.object({
    API_URL: v.string(),
});
export const parseConfig = (config) => {
    return v.parse(ConfigSchema, config);
};
