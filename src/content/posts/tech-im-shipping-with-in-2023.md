---
title: "Tech I'm shipping with in 2023"
description: "Here's the tech I'm going to be using in 2023 to ship my side projects"
keywords: "tooling, technology, programming, programming languages, build in public"
isPublished: true
isFeatured: true
publishedOn: "April 1, 2023"
---

As I wrote about in [my goals for 2023](https://brockherion.dev/blog/posts/my-goals-for-2023/), one of my goals for this year is to ship at least three projects. With these projects, I want to ship quickly, but also I want to learn and use some new tech as well. In this article, I'll be sharing the different tools I'll be using to build and deploy my projects with.

## Programming languages, frameworks, and databases

My preferred language for building applications is TypeScript. TypeScript is great because I can use it for my frontend, backend, and even mobile app if I wanted to. Because I can build my whole project in a single language, I can move much faster when developing new features.

To actually build my applications, I'll be using NextJS with Tailwind and tRPC. This has been my go-to stack for some time and for good reason. NextJS is a beast of a framework to build apps in. Not only can you build your frontend with it, but your entire backend as well. Coupled with tRPC, you have a completely type-safe fullstack framework. Tailwind gives you the ability to create nice looking user interfaces with ease. All these things together lead to a fantastic development experience.

Some other libraries I'll be using are

- Drizzle ORM
- Zod
- Zustand
- React Hook Form

For projects that will be mostly static content, I'm using Astro. It's what I used to create this site and love the experience it provides. Not every site needs to be a SPA or need SSR, so Astro is what I reach for when I just need a simple, statically generated website.

I would love to be able to use Rust or Ruby on Rails, but I'm not too sure where they fit in. Rust is something I've been meaning to build something with, I just haven't found a great use for it in my apps yet. I also keep seeing Ruby on Rails used for building backends and I've been intrigued by it for some time. I could potentially use Rust for some long running processes or jobs, and Rails for any public APIs. These would be more for my own learning than anything else.

In terms of databases, I'll be using Planetscale for most all of my database needs for this year. I've been using it for over a year a this point and it's completely changed my relationship with relation databases. Planetscale is essentially serverless MySQL with some amazing, developer-first features that make database work much easier.

## DevOps, hosting, and dev tooling

Right now, I'm deploying almost all of my projects to Vercel. Because Vercel is the owner and maintainer of NextJS, they make it incredibly easy to deploy on their platform. Aside from that, they make things like configuring domains and viewing API requests really easy to do from their dashboard. Vercel provides a ton of great tooling that makes deploying your apps simple.

I'm also going to be using Cloudflare more this year. This site is hosted on Pages and, like with Vercel, it was really simple to use. I signed for Cloudflare Images to handle image sizing as well as using it as a CDN. Cloudflare provides a ton of other services like R2 for object storage, Workers for serverless functions, and a ton of web monitoring tools.

Some other things I'll be taking advantage of this year are

- GitHub Actions for CI/CD
- Axiom for logging
- Railway for backends, CRON jobs, database hosting
- Clerk for application authentication
- Docker for quickly spinning up services

## Applications

To help me stay organized this year, I'll be managing my projects in Notion. I've tried Trello, GitHub Issues, and a few other tools, and I haven't found anything as powerful or as flexible as Notion. It's still my favorite tool for project planning and progress tracking.

I've also been using Arc browser for a few weeks now and I'm really impressed with it. For just browsing, it's a really nice experience, but it just goes that little extra mile for when you're programming. Arc let's you take screenshots, quickly browse to your network and console tabs, and more. It's been great so far and I'll definitely continue using it as my main browser.

One other app I'm going to leverage heavier this year is Discord. It's a great place to grow and interact with a community. As I build products and share them, I want to use Discord as a place where people can discuss and make connections.

## Other miscellaneous tools

Other tools I'll be using this year in my coding workflow are

- VS Code for code and text editing
- iTerm2 with ZSH for my terminal on Mac
- Windows Terminal with WSL Ubuntu and ZSH on Windows
- Raycast for search on Mac
- Fig for an awesome Mac terminal experience
- Firefox Developer edition
