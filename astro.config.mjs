import { defineConfig } from 'astro/config';
import preact from '@astrojs/preact';
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";
import mdx from "@astrojs/mdx";

import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  vite: {
    ssr: {
      external: ['svgo']
    }
  },
  integrations: [preact(), react(), tailwind({
    config: {
      applyBaseStyles: false
    }
  }), mdx(), sitemap()],
	site: "https://brockherion.dev",
  markdown: {
    shikiConfig: {
      theme: 'dark-plus'
    }
  }
});