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
