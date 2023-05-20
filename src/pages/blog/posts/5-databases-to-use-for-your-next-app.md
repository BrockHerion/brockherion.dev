---
layout: "../../../layouts/BlogPost.astro"
title: "5 databases to use for your next app"
description: "Here are five awesome databases you should for your next application"
keywords: "goals, personal growth, milestones, build in public"
slug: 5-databases-to-use-for-your-next-app
isPublished: true
isFeatured: false
publishedOn: "May 20, 2023"
image: /posts/5-databases-to-use-for-your-next-app.webp
permalink: "https://brockherion.dev/blog/posts/5-databases-to-use-for-your-next-app"
---

The database landscape has been shifting rapidly. There are a ton of great options to choose from to help you get your next project off the ground. And with such a wide variety to choose from, you're bound to find one that fits your needs.

Here are (in no particular order) 5 databases for you to use in your next app.

## PlanetScale

PlanetScale is a serverless MySQL solution with some amazing features. Built on Vitess, PlanetScale makes managing a MySQL instance painless. Setup is a breeze and it's ability to scale is unparalleled. The developer experience is top-notch here as well, with PlanetScale letting you create database branches. These branches let you modify your schema without touching your production environment. And when you're ready to deploy, you can create deployment request to merge your schema changes into your main branch. It's a truly modern database experience.

Learn more: [PlanetScale](https://planetscale.com/)

## Supabase

Supabase is an open-source rival to solutions like Firebase. It's main database is built on Postgres, and Supabase gives you full control over your instance. It provides a powerful browser-based editor for your tables and SQL scripts, as well as the ability to manage database roles, permissions, functions, and so much more. Supabase also provides a variety of other features to make creating your applications easier. They provide solutions for authentication, storage, edge functions and more. Supabase gives you everything you need to build an app fast.

Learn more: [Supabase](https://supabase.com/)

## Upstash

Upstash is a great solution for those needing a Redis database or Kafka instance. Redis is not a relational database, like MySQL or Postgres, but a key-value database the persists data in memory. This makes Redis a great solution for things like data caching. Upstash makes it incredibly easy to get a Redis instance up and running. Upstash is also designed to work well with serverless and edge environments, so you can spent less time getting Redis setup and more time shipping your project.

Learn more: [Upstash](https://upstash.com/)

## Vercel

Vercel is known for providing hosting and serverless function solutions, as well as being the maintainers of the incredibly popular NextJS framework. They recently announced that they're adding a variety of data storage features to their product offerings, which I wrote my thoughts on in [Vercel is doing storage now](https://brockherion.dev/blog/posts/vercel-is-doing-storage-now/). There are two database solutions they're shipping, one is Vercel KV and the other Vercel Postgres. Vercel KV is a Redis solution that's actually built on Upstash's platform. Vercel Postgres is a Postgres database offering built on Neon. Neon is similar to PlanetScale, but running Postgres instead of MySQL. If you're hosting your app on Vercel already, these might be great solutions for getting your databases setup quickly.

Learn more: [Vercel Storage](https://vercel.com/storage/kv)

## Cloudflare D1

Cloudflare is a giant in the web development space. With a massive catalog of product offerings, it's only natural that they would offer some sort of database solution. Cloudflare D1 is a serverless SQLite database that's designed to perfectly integrate with your Cloudflare Workers or Pages projects. Cloudflare gives you the ability to make changes with the Wrangler CLI or directly in the Cloudflare dashboard. If you're working with Cloudflare tools already and need to a database up quickly, D1 would be a great solution for you.

Learn more: [Cloudflare D1](https://developers.cloudflare.com/d1/)

## Other databases

- [CochroachDB](https://www.cockroachlabs.com/product/): Self or cloud-hosted relational database
- [Neon](https://neon.tech/): Serverless Postgres solution
- [Firebase](https://firebase.google.com/): Backend-as-a-service solution that provides data storage
- [Amazon RDS](https://aws.amazon.com/rds/): Relational database instances in Amazon Web Services
- [MongoDB](https://www.mongodb.com/): No-SQL database that stores data in a JSON-like document
