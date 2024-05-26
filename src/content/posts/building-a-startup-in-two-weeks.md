---
title: "Building a Startup in Two Weeks"
description: "This is how I built Queuebase in two weeks and what I learned from it."
keywords: "startups, saas, nextjs, buildinpublic"
isPublished: true
isFeatured: true
publishedOn: "May 26, 2024"
---

One of the best pieces of advice I'd been given as a software developer was build things that scratch your own itch. This is exactly what I did with [Queuebase](https://queuebase.com), a tool to help manage background jobs in Next.js. And now that I've started integrating it with my own projects, I wanted to share what I've learned from this experience and how it's changed my mindset of building products.

## Background

Maybe two weeks was a bit misleading. I had the idea for Queuebase since July of 2023, where I found myself needing a solution for CRON jobs for a freelance project. I didn't like what existing solutions had to offer. It's not that there aren't great solutions out there, it's that none of them really felt right. Whether it was setup being too much work, not having all the features I needed, or simply not being maintained, I couldn't find a solution I was happy with.

That was when I started asking around on Twitter if others had similar gripes. Sure enough, I wasn't alone in my complaints. I decided I was going to build Queuebase.

## Initial Development

I started work on Queuebase around September of 2023. I had done research on job queues, what kinds of message brokers were available, and planned out what I wanted the SDK to look like. My initial stack was this:

- Redis Pub/Sub for my queue and storing job data
- Fastify for my API
- TypeScript for my programming language
- Next.js for my frontend
- MySQL via PlanetScale for my database

Almost immediately, I was not a fan of Fastify and it's plugin architecture. So I swapped that out for Express, which wasn't too much work. I then setout modeling my data, building my API, and getting a dashboard running.

Here, I started hitting roadblocks that really slowed down my progress. First was using Redis to store job data, where I spent too much of my time figuring out what I needed to store in Redis, how to structure it, and how to retrieve it. Another blocker was how to efficiently run a worker(s) in Node to poll jobs in my queue.

These, combined with having a to manage multi-app setup, led me to abandon that version of Queuebase. It's not that I couldn't have worked out how to do workers or Redis queueing/caching for jobs, but that it was eating up too much of my time. The app was complicated out of the gate for no reason. The pieces of it and overall flow were there, but I was trying to over optimize before I had anything working.

## Revising and Simplifying

I took a break from working on Queuebase for a little bit. It was around late October/early November of 2023 when I stumbled on Upstash and their serverless message broker, QStash.

QStash solved all the issues I had in my initial attempt. Setup was very minimal, it would handling queueing and message delivery for me, had support for CRON jobs, and a ton of other great features. It also has great support for Next.js.

Because of the Next.js support, I was able to build the entire app in Next. I was able to leverage Next's API endpoints to build:

- A public-facing API that the SDk would interact with
- A producer to publish messages to QStash
- A consumer to actually run jobs
- An internal API only to be used by the dashboard.

This took me really far. I was able to get a PoC working with this setup in far less time than if I was trying to build this all by hand. There was just one problem: the SDK.

## Building the SDK

Most things I build are user-facing. I'm used to setting up Next/Node apps and deploying them to all kinds of environments. I was not used to setting up bundlers to build packages that I would then be publishing to npm. And beyond that, I had no experience building out the kind of SDK I imagined for Queuebase.

I wanted my SDK to be like tRPC/UploadThing for jobs. The developer experience of those tools are unmatched. The issue I ran into was figuring out how to get TypeScript to do what I wanted. I imagined you would write jobs like so:

```ts
const j = createJobBuilder();

const jobs = {
  sayHello: j().handler(() => {
    console.log("Hello!");
  })
};
```

Then to queue it, you would write:

```ts
import { jobs } from "@/utils/queuebase";

function sayHello() {
  jobs.sayHello.enqueue();
}
```

The problem here is two-fold. There's the job definitions that get mapped as API routes (where the handler runs) and the jobs client object, which exposes methods that let you interact with a job from your code. I had no idea how to create my types in such a way that I could build my job routes and use those definitions to generate a 100% type-safe client.

Getting frustrated with this, I took a step back (again) and left the project alone.

## Building out the MVP

I left Queuebase alone for months, telling myself at some point I would go back to it. In April of 2024, I decided to pick it back up. Not just pick it back up, but start over again. This would be the single choice took Queuebase further than I had imagined with it.

I started with a new Next.js app and brought the colorscheme from the old site over, along with some other UI elements. I then got to work simplifying the data model. The original model worked, but it was way too bloated. Most of the tables I had I didn't need, so I dropped them. I also built the minimal amount of features needed for this to work. You could login, create an app, and view job details. That was it.

Once I had the APIs all working and QStash wired up, I then went back to tackle the SDK. I spent a lot of time pouring over the tRCP and UploadThing source to try and figure out the type magic they were doing. Slowly, but surely, I was able to get all the pieces in place for a type-safe client, almost identical to what I originally envisioned. And after doing some testing and making small adjustments, I had done it. I built the package and published it to npm.

I had a working MVP for Queuebase.

## Going to the Next Level

After two weeks of work, I had a working version of Queuebase I could now integrate with my projects. Not only that, but I started adding a ton of new features, shipping about one per day. Over the past few weeks, I've shipped:

- CRON scheduling
- Job syncing
- Environments/branches
- Logging to the SDK and dashboard
- Multiple runs/attempts on failure
- Next.js /pages support
- API usage logging
- A documentation site
- Team/workspace management

There are still some small things I have in my backlog to add, but in terms of features, Queuebase is ready to go. I've already started integrating it with my freelance projects that need background jobs, and the experience using it has been nothing short of incredible.

## Next Steps

The next steps for Queuebase are to get people using the app. Right now, I'm a developer, so marketing is a whole new ballgame to me. I've talked to some awesome people who've given me some great advice with how to tackle this. The other thing I'm figuring out is monetization. I'm not entirely sure how I want to handle that, but I have a few ideas I'm toying with.

What I do know is that I will be open-sourcing the SDK and allowing people to contribute. I also created a [Discord server](https://discord.gg/PvWsDCjv) for users to join and be apart of the community. I've also published a roadmap to show what features I have planned!

## Takeaways

There was a lot that I learned from this experience. The first, and biggest, lesson was don't overthink it. Too much pre-optimization and setup kills momentum and takes time away from you shipping features. Using tech you're unfamiliar with is another way to kill momentum. Is my code perfect? No. Will my setup scale? I have no idea. I'm not going to worry about potential issues and unknowns right now. Keep it simple and tackle things as they come up.

The other thing, which I also learned the hard way building Chirpmark, was to have a solid foundation. Knowing exactly what I wanted to build and what the product should be kept me grounded. Anytime I would find myself straying into feature-creep territory, I would ask myself if this feature would make Queuebase better. More often than not, the answer was no. Staying focused on building a solid core let me go from idea to reality.

Overall, I'm very happy with how this project has turned out and where it's going. Whether Queuebase takes off or not, I'm going to keep building and shipping apps. This whole journey has been incredibly motivating and I can't wait to see where it goes next.
