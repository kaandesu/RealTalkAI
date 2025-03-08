import type { ModuleOptions } from "@nuxtjs/tailwindcss";
import type { Prettify } from "~/types";
export const tailwindcss: Prettify<ModuleOptions> = {
  cssPath: "~/assets/css/tailwind.css",
  configPath: "tailwind.config",
  exposeConfig: false,
  exposeLevel: 2,
  config: {},
  injectPosition: "first",
  viewer: true,
  quiet: true,
  editorSupport: false,
  // disableHmrHotfix: false,
  addTwUtil: false,
};
