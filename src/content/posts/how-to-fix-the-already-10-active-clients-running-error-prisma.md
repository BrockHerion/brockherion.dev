---
title: "How to fix the `Already 10 Prisma Clients are actively running` error in Prisma"
description: "Here's How to fix the 'Already 10 Prisma Clients are actively running' error in Prisma in your Next.js app"
keywords: "nexjs, javascript, typescript, prisma, node"
isPublished: true
isFeatured: true
publishedOn: "November 19, 2023"
---

> Big thank you to [LinkUp|QR](https://linkupqr.com) for sponsoring this post! With features like digital business cards and in-depth network analytics, LinkUp makes it incredibly easy to grow your network. And if you use code 'BROCK10' at checkout, you get 10% off! Thank you again LinkUp and enjoy the article.

While working with Prisma and Next.js, you may have come across this error in your terminal output

```shell
warn(prisma-client) Already 10 Prisma Clients are actively running.
```

This can be an annoying and somewhat tricky thing to figure out. In this article, we'll look at why this occurs and how to fix it.

## What causes this error?

This error shows up when you have a few Prisma Clients running in your app, each with their own connection pool. Normally, you would create a new Prisma instance like so

```ts
import { PrismaClient } from  "@prisma/client";
const prisma = new PrismaClient();
```

This is our culprit. The error can come initializing new clients multiple times or having a client be re-created from something like hot reload, and the connection is never disposed.

## How to fix it

Thankfully, the fix is really simple. What we need to do is create a single place in our application where a Prisma Client is created and use that client.

```ts
// lib/prisma.ts
import { PrismaClient } from  "@prisma/client";

 // Important if you're using TypeScript!
declare global {
  var prisma: PrismaClient;
}

let prisma;

if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient(["error"]);
} else {
  if (!global.prisma) {
    global.prisma = new PrismaClient(["info", "error", "warn"]);
  }
  prisma = global.prisma;
}

export default prisma;
```

This will create a single Prisma Client that we can use throughout our application. We're saving on a `global` object, expect in production where we're instantiating the client as a normal object.

Now, you can start using your Prisma Client in anywhere in your Next.js app!

## Resources

- [Already 10 Prisma Clients are actively running](https://github.com/prisma/prisma/discussions/4399)
- [How to fix the `Already 10 Prisma Clients are actively running` error](https://flaviocopes.com/nextjs-fix-prismaclient-unable-run-browser/)
- [Best practice for instantiating PrismaClient with Next.js](https://www.prisma.io/docs/guides/other/troubleshooting-orm/help-articles/nextjs-prisma-client-dev-practices)
