---
layout: "../../../layouts/BlogPost.astro"
title: "Vercel is doing storage now"
slug: vercel-is-doing-storage-now
description: "My take on Vercel now offering Redis, Postgres, and blob storage solutions."
keywords: "vercel, web development, database, redis, postgres"
isPublished: true
isFeatured: false
publishedOn: "May 2, 2023"
image: /posts/vercel-is-doing-storage-now.webp
permalink: "https://brockherion.dev/blog/posts/vercel-is-doing-storage-now"
---

I've been using Vercel as my hosting provider for a long time now. Every single site I build in Next.JS is deployed on their platform and it's been a joy to work with. Vercel strives to create great developer experiences, which comes through in every single part of application deployment process.

So I suppose it's only natural that they extend this functionality to other areas of web development as well, namely those who are consistent thorns in peoples sides. Yesterday, Vercel announced a few new storage offerings on their platform: a key-value storage solution using Redis, a full Postgres database, and blob storage for your static files. While not every feature is available to the public yet, I wanted to share my thoughts on this and what it means for web development.

## Vercel Blob

This is probably the offering I have the least amount to say about. Static file storage is a constant headache and nobody has built anything great around it yet. Vercel Blob is being powered by Cloudflare R2, which is Cloudflare's file storage offering. It's great to see this space being taken more seriously and see solutions being worked on to help solve the awful developer experience around blob storage.

Vercel Blob is not currently available to the public and is currently in a private beta. What I'm most curious about is how this does against Theo Brown's [UploadThing](https://uploadthing.com/). Theo has been hard at work making blob storage not suck, so I'm curious to see how Vercel handles this issue.

## Vercel KV

This is where things get more interesting. Vercel KV is a Redis offering using Upstash in the background. Upstash provides Redis and Kafka offerings, and is what I would reach for first when I'm in need of key-value storage or a message broker. There is one key word in their announcement post, however, that has me really interested in Vercel KV. That word is "durable".

> We’ve partnered with Upstash to deliver tooling designed to embrace serverless, that persists in memory and on disk by default. This means it can be used to persist state, without risk of losing your data when a server crashes.

Redis in general is better suited as a cache than a persistent data store. I want to see how this works in practice, but it is reassuring to think that if my cache goes down, that data can be recovered. As a whole, Vercel VS looks promising and I'm looking forward to using it in my applications.

## Vercel Postgres

I'm not going to lie, this is probably my least favorite of the three new offerings. Don't get me wrong, there's a lot here I like. The API looks incredibly simple and easy to work with. Combined with React Server Components, this looks like a killer offering.

Vercel Postgres is built on Neon, which is a serverless Postgres offering that looks similar to PlanetScale. I haven't used Neon, so I don't have much to say about it as a tool or platform, but this does beg the question: what can Vercel Postgres offer to pull me away from PlanetScale. PlanetScale has a fantastic library for working with MySQL at the edge. And, because I dislike writing raw SQL, I would end up using something like Drizzle as my ORM to do a lot of the heavy lifting for me.

Now I will take Vercel Postgres out for a spin just to fully compare the solutions, but I think I'll stick with PlanetScale for now. It's been wonderful to work in so far, by far the best database experience I've had as a developer. Vercel Postgres would need to beat the PlanetScale flow in order for me to switch over.

## Wrap up

This week Vercel announced new storage offerings that aim to upset the current web development status-quo. Each offering fills some part of the web development that usually ends up being a pain for most people. Vercel takes care to provide great developer experiences, and I have no doubt they'll deliver with these storage offerings as well.

I think this is a smart move on their part in the long run. As React Server Components and /app continue to mature, having these solutions on the platform means that developers can focus on building great sites and not managing their infrastructure. They'll make it a lot easier to build robust and scalable web applications.

The future of web development is getting exciting and I can't wait to see what's coming next.

## Resources

- [Introducing storage on Vercel](https://vercel.com/blog/vercel-storage)
- [Vercel storage](https://vercel.com/storage/kv)
- [Upstash](https://upstash.com/)
- [Neon](https://neon.tech/)
