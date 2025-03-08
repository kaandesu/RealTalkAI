import type { ModuleOptions } from "@nuxt/image";
import type { Prettify } from "~/types";
export const image: Prettify<ModuleOptions> = {
  inject: false,
  format: ["webp"],
  screens: {
    xs: 320,
    sm: 640,
    md: 768,
    lg: 1024,
    xl: 1280,
    xxl: 1536,
    "2xl": 1536,
  },
  provider: "static",
  dir: "public",
  presets: {
    avatar: {
      modifiers: {
        format: "jpg",
        width: 50,
        height: 50,
      },
    },
  },
  domains: [],
  alias: {},
  providers: {},
  densities: [],
};
