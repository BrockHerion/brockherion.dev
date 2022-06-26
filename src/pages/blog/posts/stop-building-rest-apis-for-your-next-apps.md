---
setup: |
  import Layout from '../../../layouts/BlogPost.astro'
title: Stop building REST APIs for your Next.js apps, use tRPC instead
subTitle: tRPC is a tool that lets you build scalable back-ends quickly, as well as provide type safety between your front and back-ends.
slug: stop-building-rest-apis-for-your-next-apps
seoTitle: Stop building REST APIs for your Next.js apps, use tRPC instead
abstract: As you build your Next.js, there's a good chance that you'll need an API, and the best way to build one is with tRPC.
isPublished: true
isFeatured: true
publishedOn: "April 4, 2022"
imageSrc: /posts/stop-building-rest-apis-for-your-next-apps.webp
---

When I first started developing full-stack applications, I was building and managing my own REST APIs. I began with building them in Java with Spring, then moved over to .NET, then to Node with Express, and even dabbled in a little bit of Django. To say that managing two different projects in different languages (sometimes) is cumbersome would be putting it lightly.

Enter tRPC, a tool for building APIs with end-to-end type-safety. tRPC lets you create robust and scalable back-ends for your Next, React, and Node apps very quickly.

Have I piqued your interest? Then I encourage you to read on! In this article, we will be looking at what tRPC is and how you can set up and use it with Next.js.

## What is tRPC?

As I mentioned before, tRPC lets you build fully typesafe APIs for your Next, React, and Node applications. With its end-to-end type-safety, you're able to catch errors between your front and back-end at compile time instead of run time. And because you're only using type declarations and not importing actual server code, your builds stay small and fast.

## Installing tRPC

Installing tRPC is pretty straightforward. There are a few packages we need, both from tRPC itself and two others that will make our lives much easier. In your Next.js project, run the following command to install your dependencies.

`$ yarn add @trpc/client @trpc/server @trpc/react @trpc/next zod react-query`

tRPC is built on `react-query`, which is a package for fetching, caching, and managing data without needing to mess with any global state. We also are using `zod` to help with our schema and input validations.

The next thing we need to do is make sure that strict mode is enabled in our `tsconfig.json`

```json
// tsconfig.json
{
  // ...
  "compilerOptions": {
    // ...
    "strict": true
  }
}
```

This isn't for tRPC specifically, but rather for `zod` to run correctly. `zod` specifically is also not a requirement for using tRPC but, as you'll see later on, it works really well with it and makes our lives a lot easier.

## Creating our server

In our project root, or `/src` folder if you're using Next with that, create a new folder called `/server`. This folder is going to contain our tRPC context, router, and our actual API routes.

One thing to note here is that our server will be deployed as a Next API route. This code is shipped as a server-side bundle and won't impact our client bundle sizes in any way.

You can read more about Next API routes in the [Next Docs](https://nextjs.org/docs/api-routes/introduction)

### Configuring our context

The first thing we want to create here is our context. Our context lets us pass down request data to each of our resolvers within our routes. To create a new context, let's create a file called `context.ts` and add the following code to it.

```ts
// server/context.ts
import { CreateNextContextOptions } from "@trpc/server/adapters/next";
import { inferAsyncReturnType } from "@trpc/server";

export async function createContext(contextOptions?: CreateNextContextOptions) {
  const req = contextOptions?.req;
  const res = contextOptions?.res;

  return {
    req,
    res,
  };
}

export type MyContextType = inferAsyncReturnType<typeof createContext>;
```

Here we're just passing along the request and response to our routes. You can add other things that you want to pass along here as well. Things like Prisma clients and NextAuth sessions are good examples of this.

### Creating a simple router

Next, let's go ahead and add a `create-router.ts` file. In this file, we'll be setting up a simple router that acts as a root.

```ts
// server/create-router.ts
import * as trpc from "@trpc/server";
import { MyContextType } from "./context";

export function createRouter() {
  return trpc.router<MyContextType>();
}
```

Declaring your routers like this is incredibly useful, as it allows you to add custom middleware logic to all routes that use your router. For example, you can create a router that checks to see if a user is logged in or if a user has the correct permissions to access a resource.

### Configuring our API routes

Let's create a new folder called `routers` and add two files to it. First, add a file called `_app.ts`. This file is going to act as our root route. Any new routes that we add will get added here.

```ts
// server/routers/_app.ts
import { createRouter } from "../create-router";

export const appRouter = createRouter();

export type AppRouter = typeof appRouter;
```

Next, let's create our second file and call it `nameRouter.ts`. This router is going to take in a name and return it to the client.

```ts
// server/routers/nameRouter.ts
import { z } from "zod";
import { createRouter } from "../create-router";

export const nameRouter = createRouter.query("getName", {
  input: z.object({
    name: z.string().nullish(),
  }),
  resolve({ input }) {
    return { greeting: `Hello ${input.name}!` };
  },
});
```

tRPC uses queries and mutations to define actions. A query is used for fetching data and mutations are used to create, update, and delete data. In the code above, we are creating a query to get a name. Our query takes in two parameters. First is the query name and the second is our params. For our params, we have input and resolve. Input is optional while resolve is required. Resolve is the actual implementation of our endpoint. In our case, we're using Zod to verify we have a string input and our endpoint will return a string that says hello to whatever name we pass in.

We can now hop back over to `_app.ts` and add our route there.

```ts
// server/routers/_app.ts
// [...]
import { nameRouter } from "./nameRouter";

export const appRouter = createRouter().merge("names.", nameRouter);

// [...]
```

### Adding an endpoint in Next.js

We need to add a new endpoint in Next.js. Under the `/pages/api` folder, create a new file under `/trpc/[trpc].ts`. Your folder structure should look like this:

```text
.
+-- pages
|	+-- api
|		+-- trpc
|			+-- [trpc].ts
```

Now add the following code to `[trpc].ts`:

```ts
// pages/api/trpc/[trpc].ts
import { createNextApiHandler } from "@trpc/server/adapters/next";
import { appRouter } from "../../../server/routers/_app";
import { createContext } from "../../../server/context";

export default createNextApiHandler({
  router: appRouter,
  createContext,
  batching: {
    enabled: true,
  },
});
```

Now, we can set up our front-end!

## Calling our API routes

Connecting our back-end to our front-end is very straightforward. First, we need to head over to our `_app.tsx` file and configure tRPC and React Query. To do that, we're going to the `withTrpc()` higher-order component.

```ts
// pages/_app.tsx

// [...]
import { withTRPC } from "@trpc/next";
import { AppRouter } from "./api/trpc/[trpc]";

function getBaseUrl() {
  if (process.browser) return "";
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;

  return `http://localhost:${process.env.PORT ?? 3000}`;
}

export default withTRPC<AppRouter>({
  config({ ctx }) {
    const url = `${getBaseUrl()}/api/trpc`;

    return {
      url,
    };
  },
  ssr: true,
})(MyApp);
```

Next, we need to add a new folder called utils and add a file called `trpc.ts`

```ts
// utils/trpc.ts
import { createReactQueryHooks } from "@trpc/react";
import { AppRouter } from "../server/routers/_app";
import { inferProcedureOutput } from "@trpc/server";

export const trpc = createReactQueryHooks<AppRouter>();

export type inferQueryOutput<
  TRouteKey extends keyof AppRouter["_def"]["queries"]
> = inferProcedureOutput<AppRouter["_def"]["queries"][TRouteKey]>;
```

Here we're creating our hook to use tRPC on the client. The hook is strongly typed using our API's type signature. This is the "magic" that gives us our end-to-end type-safety. This hook lets us call our back-end and get fully typed inputs and outputs from it. And, if you change a route name, you will get an error on the client. It's very powerful.

The last thing we need to do is actually use our query. Create a new page and name it `name.tsx`. Add the following code to it

```ts
// pages/name.tsx
import { trpc } from "../utils/trpc";

export default function Name() {
  const nameQuery = trpc.useQuery(["name.getName", { name: "Brock" }]);

  return (
    <>
      {nameQuery.data ? (
        <h1>{nameQuery.data.greeting}</h1>
      ) : (
        <span>Loading...</span>
      )}
    </>
  );
}
```

Of course, feel free to replace "Brock" with your name!

Let's run our Next app and head over to our new page. On the '/name' page, you should now see a message that says "Hello" to whatever name you entered.

## Conclusion

In this article, we looked at what tRPC is and how to use it with a Next.JS app. tRPC makes building APIs for your applications incredibly easy. Not only can use it with Next, but you can also use it with React and Node applications as well. For more information, check out the [tRPC docs](https://trpc.io/). You can also find various examples under the [Example Apps](https://trpc.io/docs/example-apps) page, including a starter for a Next and React Native app.

Happy coding everybody!
