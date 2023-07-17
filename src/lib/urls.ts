import { CollectionEntry } from "astro:content";

// TODO: Move to .env
export const baseUrl = "https://brockherion.dev";

export function generatePermalink(slug: string) {
  return `${baseUrl}/${slug}`;
}

export function generateImageUrl(slug: string, extension: string) {
  return `/posts/${slug}.${extension}`;
}

export function generatePostUrl(slug: string) {
  return `/blog/posts/${slug}`;
}
