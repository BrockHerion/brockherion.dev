import { CollectionEntry } from "astro:content";

// TODO: Move to .env
export const baseUrl = "https://brockherion.dev";

export function generatePermalink(slug: string) {
  return `${baseUrl}/${slug}`;
}

export function generatePostUrl(slug: string) {
  return `/blog/posts/${slug}`;
}
