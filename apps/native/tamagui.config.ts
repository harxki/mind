import { defaultConfig } from "@tamagui/config/v4";
import { createFont, createTamagui } from "tamagui";
import { themes } from "./theme";

export const tamaguiConfig = createTamagui({
  ...defaultConfig,
  themes,
  fonts: {
    body: createFont({
      family: "NotoSansJP, sans-serif",
      size: {
        1: 12,
        2: 14,
        3: 16,
        4: 18,
        5: 20,
        6: 22,
        7: 24,
        8: 26,
        9: 28,
        10: 30,
        11: 32,
        12: 34,
        13: 36,
        14: 38,
        15: 40,
        16: 42,
        17: 44,
        18: 46,
        19: 48,
      },
      face: {
        "400": { normal: "NotoSansJP_400Regular" },
        "500": { normal: "NotoSansJP_500Medium" },
        "700": { normal: "NotoSansJP_700Bold" },
      },
    }),
  },
});

export default tamaguiConfig;

export type Conf = typeof tamaguiConfig;

declare module "tamagui" {
  interface TamaguiCustomConfig extends Conf {}
}
