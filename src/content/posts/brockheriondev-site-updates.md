---
title: "brockherion.dev site updates"
description: "I recently made some pretty large changes to brockherion.dev. Here's what I did and why."
keywords: "astro, react, blog, personal blog, web development"
isPublished: true
publishedOn: "August 12, 2023"
---

This article is a follow-up to [How I built brockherion.dev](./how-i-built-brockherion-dev). In that article, I gave some background from my initial blog in Wordpress to where I am now with Astro.

As I was writing posts however, I started to get frustrated with the whole process I had for myself. My setup was more complex than it had any reason reason to be. And being on a "just keep everything as simple as possible" kick lately, I decided it was time for an upgrade.

## Moving to collections

In version 2.0.0, Astro added in content collections, which are a way to manage, validate, and get type-safety around your resources. After upgrading my Astro version, the first thing I did was moved my markdown files out of my pages directory and put them in a content collection.

I added my `config.ts` file and created a collection called posts. I also installed `zod` for validating my frontmatter. My config looks like this

```ts
import { defineCollection } from "astro:content";
import { z } from "zod";

const posts = defineCollection({
  type: "content",
  schema: z.object({
    isDraft: z.boolean().optional().default(false),
    isPublished: z.boolean().optional().default(false),
    title: z.string(),
    description: z.string(),
    keywords: z.string().optional(),
    publishedOn: z.string(),
  }),
});

export const collections = { posts };
```

This also gave me a chance to cleanup my posts frontmatter. I had a lot of fields that I did not need to have. Moving to collections and having validation helped me find and remove any fields I didn't need.

In my pages, I can access my collection like so

```ts
import { getCollection } from "astro:content";

const posts = await getCollection("posts");
```

And that's it. Content collections helped me to streamline my workflow and simplify my setup.

## UI updates

After migrating to collections, I decided to focus on making my UI a bit nicer. The first thing I did was update my layout and colorscheme. Again, I removed a lot of unnecessary styles and complex layout that did not need to be here. It also was a chance for me to fix or remove some bits that were weird on smaller screens.

After that, I decided to add in Framer Motion to give the site a little bit of life. I used it to create a animated header, which is currently enabled on the home page. Astro is what I would describe as bring-your-own-framework, which means you can use React, Vue, and Svelte components along with Astro's. That means that I can use Framer Motion, a React library, in my Astro project.

Getting that work, however, required diving into Astro Islands. Islands are an interactive component in an otherwise static page. With this pattern, JS is only loaded for components that need it.

For my animated header, I did this

```astro
---
import { motion } from "framer-motion";

type Props = {
  enableAnimation?: boolean;
};

const { enableAnimation } = Astro.props;
const transitionDelay = 0.5;
---

<header>
  <motion.div
    client:load
    initial={enableAnimation ? { opacity: 0, y: -20 } : false}
    animate={{ opacity: 1, y: 1 }}
    transition={{ duration: 0.5 }}
    className="text-zinc-400 text-xs"
  >
     <!-- Rest of children omitted -->
  </motion.div>
</header>
```

Notice the `client:load` directive. This tells Astro to load and hydrate the components JavaScript on page load. If you don't need this behavior, there are other directives that help dictate when and how a component's JS is loaded.

## Other small things

Aside from those larger changes, there were a couple of other, smaller things I did

1. Created React components for UI elements like Links and Cards
2. Removed images from my blog post headers
3. Added a new section on the home page for projects
4. Embedded a newsletter sign-up for ConvertKit, which is where I moved Brock's Bytes to after Twitter killed Revue

## Upcoming changes

Coming down the pipeline, we have

1. Adding search functionality with Fuse.js
2. Embedding my Cal.com link to quickly schedule calls
3. Add my Buy me a Coffee link to blog posts
4. Quick share functionality to Twitter, Facebook, etc

## Resources

- [GitHub repo](https://github.com/BrockHerion/brockherion.dev)
- [Astro docs](https://docs.astro.build/en/getting-started/)
- [Framer Motion](https://www.framer.com/motion/)
