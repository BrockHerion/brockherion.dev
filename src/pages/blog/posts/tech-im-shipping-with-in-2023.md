---
layout: "../../../layouts/BlogPost.astro"
title: "Tech I'm shipping with in 2023"
description: ""
keywords: "goals, personal growth, milestones, build in public"
slug: tech-im-shipping-with-in-2023
isPublished: false
isFeatured: true
publishedOn: "April 1, 2023"
image: /posts/my-goals-for-2023.webp
permalink: "https://brockherion.dev/blog/posts/my-goals-for-2023"
---

As I wrote about in [my goals for 2023](https://brockherion.dev/blog/posts/my-goals-for-2023/), one of my goals for this year is to ship at least three projects. With these projects, I want to ship quickly, but also I want to learn and use some new tech as well. In this article, I'll be sharing the different tools I'll be using to build and deploy my projects with.

## Programming languages and frameworks

My preferred language for building applications is TypeScript. TypeScript is great because I can use it for my frontend, backend, and even mobile app if I wanted to. Because I can build my whole project in a single language, I can move much faster when developing new features.

To actually build my applications, I'll be using NextJS with Tailwind and tRPC. This has been my go-to stack for some time and for good reason. NextJS is a beast of a framework to build apps in. Not only can you build your frontend with it, but your entire backend as well. Coupled with tRPC, you have a completely type-safe fullstack framework. Tailwind gives you the ability to create nice looking user interfaces with ease. All these things together lead to a fantastic development experience.

For projects that will be mostly static content, I'm using Astro. It's what I used to create this site and love the experience it provides. Not every site needs to be a SPA or need SSR, so Astro is what I reach for when I just need a simple, statically generated website.

## Databases

I'll be using Planetscale for most all of my database needs for this year. I've been using it for over a year a this point and it's completely changed my relationship with relation databases. Planetscale is essentially serverless MySQL with some amazing, developer-first features that make database work much easier.

I also plan on using Redis in some of my apps as a cache for some of my data. It would help speed up data fetching and reduce trips to the database, leading to a better user experience overall. Redis is something I've used mostly in passing, so I'm excited to implement it.

## DevOps

Right now, I'm deploying almost all of my projects to Vercel. Because Vercel is the owner and maintainer of NextJS, they make it incredibly easy to deploy on their platform. They also have a ton of integrations with other 
