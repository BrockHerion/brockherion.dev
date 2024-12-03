import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";
import mdx from "@astrojs/mdx";
import icon from "astro-icon";
import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  vite: {
    ssr: {
      external: ["svgo"],
    },
  },
  integrations: [
    react({
      experimentalReactChildren: true,
    }),
    tailwind({
      config: {
        applyBaseStyles: false,
      },
    }),
    mdx({
      extendMarkdownConfig: false,
    }),
    sitemap(),
    icon(),
  ],
  site: "https://brockherion.dev",
  markdown: {
    shikiConfig: {
      theme: "dark-plus",
    },
  },
  site: "https://brockherion.dev",
});
