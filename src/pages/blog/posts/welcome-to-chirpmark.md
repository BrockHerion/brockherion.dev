---
layout: "../../../layouts/BlogPost.astro"
title: 'Welcome to Chirpmark! - Chirpmark Devlog #1'
subTitle: Chirpmark is an app I'm building for managing Twitter bookmarks. It will allow users to save, organize, and do more with their bookmarks.
slug: welcome-to-chirpmark
description: Chirpmark is an app I'm building for managing Twitter bookmarks. It will allow users to save, organize, and do more with their bookmarks.
isPublished: true
isFeatured: false
publishedOn: "July 11, 2022"
image: /posts/welcome-to-chirpmark.webp
permalink: 'https://brockherion.dev/blog/posts/building-reusable-components-in-react-with-typescript-and-generics'
---

If you follow me on Twitter, you've probably seen me Tweet about Chirpmark a few times. It's an app I'm working on that aims to make Twitter bookmarks actually useful. My goal is to create a platform that's easy to use, yet provides rich and powerful features to its users.

I got this idea a few months ago when I was complaining on Twitter about how poor their bookmarking system is. I tend to save a lot of content that I want to revisit later. Maybe it's a link to an article I want to read or a thread I want to dissect further, or something else entirely. With the current system, most of what I save gets lost. There's no way to organize and sort your bookmarks in any meaningful way. That is, of course, you pay for Twitter Blue, which gives you the basic functionality of creating folders to put your bookmarks in.

Feeling fed up, I decided to create my own platform for managing bookmarks. And after some discussion with other Twitter creators, I realized that this was something that others could use as well. So, I buckled down and got to work.

## What tech did I use to build Chirpmark?

The stack I chose to build Chirpmark in is the same stack I always pick for side projects. The main site is built using Next.js with TypeScript. My backend consists of some normal Next.js endpoints and one for tRPC. tRPC is my favorite way to build backends. If you want to learn more, check out my article [Stop building REST APIs for your Next.js apps, use tRPC instead](https://brockherion.dev/blog/posts/stop-building-rest-apis-for-your-next-apps/) or visit the [trpc.io](https://trpc.io/) for more information.

For styling, I went with [Tailwind](https://tailwindcss.com/). Tailwind makes it really easy to make unique and clean sites. Like with tRPC, Tailwind takes a lot of thinking out of the equation for me. I don't need to fiddle around with stylesheets or SASS builders or anything like that. Most of its defaults are perfect for my use case and, if I need something more, it's super easy to define my own classes and styles.

My database choice was also a no-brainer for me. I chose [Planetscale](https://planetscale.com/), a serverless MySQL database that has completely changed how I use databases. Planetscale provides some amazing functionality that makes my life a lot easier. Its CLI is very powerful and easy to use, it's easy to scale, and its branching system makes updating my schema way less terrifying. I can't say enough good things about Planetscale!

Because my site is built on Next.js, I decided on Vercel for hosting. Vercel makes it really easy to get a site live with very little work. My project is also set up as a monorepo with two sites so far, one for the website and one for the actual app. The monorepo is powered by `pnpm` and Turborepo. This setup allows me to share code between my projects and reduce build times. I'll also be able to add other projects relatively easily, but more on that later.

## What can Chirpmark do?

For the version 1.0.0 release on July 18th, Chirpmark will offer what Twitter Blue does and a little bit more. Not only are you be able to create collections to store your bookmarks, but you can add sub-collections as well. This allows you to organize your bookmarks exactly how you want them to.

You can also tag your bookmarks. Tags allow you to have a finer grain of control over how you want your bookmarks organized. It also makes it really easy for you to filter your bookmarks as well.

As for getting your bookmarks into the app, you have two options right now. The first is to import your entire bookmark collection from Twitter. The other option is to add a bookmark using a Tweet URL. One thing to be aware of here is that adding by URL will not add the bookmark to your Twitter bookmark list, but this is something I have planned for a later release.

## What's next in Chirpmarks roadmap?

While this first release is focused more on saving and organizing, I have some really cool ideas for later releases. The next release will most likely focus on making bookmarks themselves useful. I will add the ability to take notes on Tweets, set up reminders for you to revisit them, and export your bookmarks to tools like Notion.

After that, I plan on making bookmarks more social. The big thing here is that you will be able to share entire collections with people. You will also be able to retweet individual bookmarks and create threads from your collections. Another planned feature for this is to allow you to connect multiple accounts and share collections between them.

Outside of features, I have plans to build a Chrome extension to make saving bookmarks even easier. I'm also toying with the idea of building a mobile app in React Native so you can bookmark on the go.

## Wrap up

Chirpmark will be available on July 18th, 2022. You can head on over to [chirpmark.com](https://chirpmark.com) to get notified when the app goes live. You can also DM me on Twitter @brockherion with any questions you might have.

As for these dev logs, I'm planning on writing one a week. I will share what I'm working on, what went well, what isn't going well, and a whole bunch more. I also will be creating video versions of them and uploading them to YouTube, so be sure to check those out as well.

Overall, I'm really excited to share this with you. I can't wait to get Chirpmark out into the world and to see what amazing things you start doing with your bookmarks!
