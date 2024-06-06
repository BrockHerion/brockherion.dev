---
title: "Introducing Queuebase - Background job and queue management for Next.js"
description: "Queuebase is a background job and queue management tool for Next.js applications."
isPublished: true
isFeatured: true
publishedOn: "June 5, 2024"
keywords: "nextjs, background jobs, queue, cron"
---

Last week, I published an article called [Building a Startup in Two Weeks](https://brockherion.dev/blog/posts/building-a-startup-in-two-weeks/). In that article, I talked a bit about why and how I built Queuebase. This week, I'm excited to share that [Queuebase](https://queuebase.com) is now live and ready for you to use!

## Features

Queuebase is a background job and queue management tool for Next.js applications. It provides a simple, yet powerful SDK for creating jobs in your code base. Using the power of TypeScript, you can define your jobs with complete type safety.

As of writing this, Queuebase supports the following features:

- Event-based job triggers
- CRON/scheduled jobs
- Delaying jobs
- Logging
- End-to-end type-safety
- Job syncing (to the dashboard)
- Environments/branches
- API keys (complete with usage logging)
- Teams/workspaces

The Queuebase dashboard gives you insight into your jobs and their statuses. It lets you see runs/attempts, view logs, manage your API keys, defined environments, and more.

## Tech Stack

Queuebase is built on the following tech:

- Next.js 14
- TypeScript
- Tailwind for styling
- Shadcn for components
- Route handlers for public API endpoints
- tRPC for internal APIs
- Postgres via Neon and Drizzle for ORM
- QStash for messaging
- NextAuth for authentication
- Vercel for hosting
- Resend for emails
- Stripe for payments

## Open Source

The Queuebase SDK is open source and available on GitHub. It was inspired by some amazing OSS tools, like [tRPC](https://trpc.io) and [UploadThing](https://uploadthing.com). It only felt right to make Queuebase open source as well. You can find it on [GitHub](https://github.com/BrockHerion/queuebase).

What is not open source is the Queuebase dashboard. That may change in the future, but I'm not 100% sure yet. Some of the code in there I may leave as proprietary, and most of it will most likely be rewritten/re-designed in the future. Some parts may be written in other languages, like Rust or Go. As for right now though, the dashboard is not open source.

If you're interested in contributing, I'd love to hear from you!

## Pricing

Pricing was something I really struggled with when building Queuebase. I wanted to make it as easy as possible for people to get started with the product, while keeping it as cost-effective as possible.

Queuebase offers four pricing tiers: Free, Basic, Pro, and Enterprise. The Free tier is free to use, but you'll be limited to a certain number of jobs per month. You are also limited in the number of apps and environments in each app.

The Basic & Pro tier are both monthly subscriptions that include overage charges. There is not cap on daily runs or number of apps. There is a cap on environments and team members in Basic. Basic is $10/month and Pro is $25/month. Each tier have an overage charge of $10 per 10,000 extra runs.

The Enterprise tier is the most expensive and includes unlimited jobs, runs, members, and environments. This tier is setup to handle large-scale use cases. The price will differ from organization to organization and will be tailored to your specific needs.

## What's next?

I have a few features planned for the next version, such as cancellation support and more advanced error handling. Eventually, I'd like to add more advanced features for the enterprise tier, like SSO support. The next major feature will be adding new team members and email/password logins. This is still ways away, but I'm excited to see where it goes.

As of now, my focus will be on marketing and getting people to try out the product. I will continue fixing bugs and updating documentation, of course, but the primary focus will be user onboarding. This is something I've never done before, so we'll see how it goes!

## Wrap up

I built Queuebase to solve the problem of managing background jobs in Next.js applications. Nothing I had tried prior ever clicked for me. I wanted to build something that was easy to use, cost-effective, and had a great developer experience.

I hope you find Queuebase useful and that it helps you in your own projects. If you have any questions or feedback, please reach out to me on Twitter [@BrockHerion](https://twitter.com/brockherion).

Happy coding!
