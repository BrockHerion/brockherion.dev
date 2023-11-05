---
title: Getting started with QStash and Next.js
description: Learn how to use QStash messaging queues with your Next.js application
isPublished: true
isFeatured: true
publishedOn: "November 5, 2023"
keywords: "nextjs, qstash, messaging queue, serverless, upstash"
---

QStash is a serverless messaging queue offered by the platform Upstash. According to the Upstash docs,

> QStash is an HTTP based messaging and scheduling solution for the serverless and edge runtimes.

It offers a number of features, such as pubsub, delayed delivery, CRON scheduling, and more.

In this article, we'll be taking a look at how you can start using QStash with Next.js to send and receive messages.

## Prerequisites

We're going to be using Next.js 13+ for this project, using the app directory.

You will need to have installed ngrok. This is because QStash requires a public URL in order to work, meaning just using `localhost` won't work.

Finally, you need to have an Upstash account in order to start using QStash. You can create one [here](https://console.upstash.com/). You'll also need your signing keys and token, which you can get from your Upstash dashboard. While you're in the dashboard, you'll want to create a new topic as well. We'll be publish to this topic in the tutorial. For simplicities sake, I'll name mine `qstash-test-topic` and give it the URL that was created by ngrok.

## Setting up Next.js

The first thing we need to do is add our signing keys and token to our `.env` file

```shell
# .env
QSTASH_URL="https://qstash.upstash.io/v2/publish/"
QSTASH_TOKEN=YOUR-QSTASH-TOKEN
QSTASH_CURRENT_SIGNING_KEY=YOUR-CURRENT-SIGNING-KEY
QSTASH_NEXT_SIGNING_KEY=YOUR-NEXT-SIGNING-KEY
```

Next, let's go ahead and install the necessary package to work with QStash

```shell
npm i @upstash/qstash dotenv
```

With this in place, we're now ready to start sending and receiving messages.

## Creating our publisher

Let's add a new route handler that will act as our message publisher. The job of this endpoint is to send messages to QStash

```ts
// app/api/publisher/route.ts
import { Client } from "@upstash/qstash";
import "dotenv/config";


const c = new Client({
  token: process.env.QSTASH_TOKEN!,
});

export async function POST(req: Request) {
  // Do your request validation/data parsing here

  // Publish our request to QStash
  const res = await c.publishJSON({
    topic: "qstash-test-topic",
    body: {
      message: "Hello there!"
    }
  })

  return Response.json({ success: true }, { status: 200 });
}
```

This is all we need to start publishing messages to QStash. To verify this is working, you can start your next app and hit this endpoint. You should then see the message appear in your QStash dashboard

## Receiving messages

We're now ready to start receiving messages. Add a new route handler and add the following code to it

```ts
// app/api/qstash/route.ts
import { NextRequest, NextResponse } from "next/server";
import { verifySignatureEdge } from "@upstash/qstash/dist/nextjs";

async function handler(req: NextRequest) {
  const data = await req.json();

  console.log("Data", data);

  return NextResponse.json({ success: true }, { status: 200 });
}

export const POST = verifySignatureEdge(handler);

export const runtime = "edge";
```

And that's it! This endpoint is our subscriber, meaning whenever a message is published our topic in QStash, it will get passed along to this endpoint. You'll also notice that this is an edge function. This will run, which gives us some benefits like reduced latency and network usage.

## Wrap up

Today we looked at how to use QStash with Next.js. We created a publisher which published messages to QStash topics. Those messages we're then passed along to our subscriber that's listening on that topic.

QStash is great solution for working with messaging queues in serverless environments. I'm currently utilizing it for [Queuebase](https://queuebase.com), an app for managing background jobs and queues in Next.js. It's been a powerful yet simple tool to work with!

## Resources

- [Upstash](https://console.upstash.com/)
- [Decouple Webhook Processing with QStash on Next.js](https://upstash.com/blog/webhook-qstash) (Great tutorial!)
- [Getting started](https://upstash.com/docs/qstash/overall/getstarted)
- [ngrok](https://ngrok.com/)