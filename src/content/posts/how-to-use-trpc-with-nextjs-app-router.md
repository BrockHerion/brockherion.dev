---
title: "How to use tRPC with Next.js App Router"
description: "In this article, we'll at how you can setup and use tRPC with Next.js App Router."
isPublished: true
isFeatured: true
publishedOn: "June 6, 2024"
keywords: "nextjs, trpc, approuter, api, typescript"
---

> Big thank you to [LinkUp|QR](https://linkupqr.com) for sponsoring this post! With features like digital business cards and in-depth network analytics, LinkUp makes it incredibly easy to grow your network. And if you use code 'BROCK10' at checkout, you get 10% off! Thank you again LinkUp and enjoy the article.

I've been using Next.js and tRPC for years now. This combination has let me build some of the most complex and powerful applications I've ever worked on, while providing full type-safety and letting me ship fast. It became an invaluable part of my development workflow.

Then, Next.js 13 came out and introduced the App Router. It was a massive shift away from the pages router, where I had been building all my apps prior. The biggest thing in Next 13 was server components and server actions. And while I do like using them, I found myself missing the power of tRPC.

In this article, we'll at how you can setup and use tRPC with Next.js App Router.

## What is tRPC?

In short, tRPC is a library for building APIs with end-to-end type-safety. It's built on top of Tanstack Query (formerly React Query) and uses the power of TypeScript to give you end-to-end type-safety between your frontend and backend. It's is a great way to build APIs in Next.js.

## Setting up tRPC

The first thing we need to do is install tRPC in our Next.js project.

```bash
pnpm i @trpc/server @trpc/react-query @trpc/client @tanstack/react-query zod superjson
```

The next thing we'll want to do is create a new folder called `trpc` and add some files to it.

First, let's create a new file called `context.ts`. This file will contain our tRPC context. Usually in here, we would add things like database connections, user sessions, and other things that we need to access in our tRPC endpoints.

```ts
// trpc/context.ts
import { createTRPCContext } from "@trpc/server";
import { type inferAsyncReturnType } from "@trpc/server";

export const createContext = async () => {
  const session = await getSession();
  const ctx = {
    session,
  }

  return ctx;
};

export type Context = typeof createContext;
```

Next, we'll create a new file called `trpc.ts`. This file will contain our tRPC configuration and some helpers for creating procedures.

```ts
// trpc/trpc.ts
import { initTRPC } from "@trpc/server";
import superjson from "superjson";

import { Context } from "./context";

const t = initTRPC.context<Context>().create({
  transformer: superjson,
});

export const middleware = t.middleware;
export const createCallerFactory = t.createCallerFactory;
export const mergeRouters = t.mergeRouters;

export const router = t.router;
export const procedure = t.procedure;
```

### Creating Middleware and Procedures

Now that we have a basic configuration, let's add some middleware and procedures that use it. We'll start by creating a an auth middleware that will check if a user is logged in.

```ts
// trpc/middleware/with-auth.ts
import { TRPCError } from "@trpc/server";
import { middleware } from "../trpc";

export const withAuth = middleware(async ({ ctx, next }) => {
  if (!ctx.session) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }

  return next({
    ctx: {
      session: ctx.session,
    },
  });
});
```

With that in place, let's create two new procedures. One will be used for any public routes and the for routes that require authentication.

To create the public procedure, we'll use the `procedure` helper from our tRPC `trpc.ts` file.

```ts
// trpc/procedures/public.ts
import { procedure } from "../trpc";
const publicProcedure = procedure;

export default publicProcedure;
```

To create the authenticated procedure, we'll use the `withAuth` middleware we created earlier.

```ts
// trpc/procedures/auth.ts
import { procedure } from "../trpc";
import { withAuth } from "../middleware/with-auth";

const authProcedure = procedure.use(withAuth);

export default authProcedure;
```

## Creating a router

Now that we have our middleware and procedures, let's create a router to handle our endpoints. To keep it simple, we'll define all our endpoints in a single file called `_app.ts`, but you can (and probably should) break it up into multiple files if you want.

```ts
// trpc/router/_app.ts
import { createCallerFactory, mergeRouters, router } from "../trpc";
import publicProcedure from "../procedures/public-procedure";
import { createContext } from "../context";

export const helloRouter = router({
  sayHello: publicProcedure.query(({ ctx }) => {
    return { greeting: `Hello World!` };
  }),
});

export const appRouter = mergeRouters(helloRouter);

export const createCaller = createCallerFactory(appRouter, createContext);

export const createAsyncCaller = async () => {
  const context = await createContext();
  return createCaller(context);
};

export type AppRouter = typeof appRouter;
```

With this in place, we can now use our router in our Next.js application.

## Using the router

The first thing we'll want to do is create a tRPC helper that we can use in our client code.

```ts
// utils/trpc.ts
import type { AppRouter } from "@/trpc/routers/_app";
import { createTRPCReact } from "@trpc/react-query";

export const trpc = createTRPCReact<AppRouter>();
```

Next, we need to create our API endpoint.

```ts
// app/api/trpc/[trpc]/route.ts
import { createContext } from "@/trpc/context";
import { appRouter } from "@/trpc/routers/_app";
import { fetchRequestHandler } from "@trpc/server/adapters/fetch";

const handler = (request: Request) => {
  return fetchRequestHandler({
    endpoint: "/api/trpc",
    req: request,
    router: appRouter,
    createContext: createContext,
  });
};

export { handler as GET, handler as POST };
```

If you've used tPRC in the pages router, you may notice we're not using the Next helper that tRPC provides. This is because the request and response objects in Pages are specific to Next.js. The App Router does away with this and uses the standard `Request` and `Response` objects. Hence, we need to use the `fetchRequestHandler` from tRPC instead.

For our last bit of setup, we need to initialize our tRPC context.

```tsx
"use client";

import { trpc } from "@/utils/trpc";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { getFetch, httpBatchLink, loggerLink } from "@trpc/react-query";
import { useState } from "react";
import superjson from "superjson";

const queryClient = new QueryClient({
  defaultOptions: { queries: { staleTime: 5 * 1000 } },
});

export default function TrpcProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  // NOTE: Your production URL environment variable may be different
  const url =
    process.env.NEXT_PUBLIC_APP_DOMAIN &&
    !process.env.NEXT_PUBLIC_APP_DOMAIN.includes("localhost")
      ? `https://www.${process.env.NEXT_PUBLIC_APP_DOMAIN}/api/trpc/`
      : "http://localhost:3000/api/trpc/";

  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
        loggerLink({
          enabled: () => true,
        }),
        httpBatchLink({
          url,
          fetch: async (input, init?) => {
            const fetch = getFetch();
            return fetch(input, {
              ...init,
              credentials: "include",
            });
          },
          transformer: superjson,
        }),
      ],
    }),
  );

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </trpc.Provider>
  );
}
```

Now, we wrap our root layout with the `TrpcProvider`.

```tsx
// app/layout.tsx
import TrpcProvider from "@/modules/core/providers/trpc";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
  <TrpcProvider>
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  </TrpcProvider>
  );
}
```

## Calling procedures

Now that we have our tRPC context and router set up, we can start calling our procedures. If you're in a client component, you can use the `trpc` helper from our `utils/trpc.ts` file. This should look very similar to how tRPC is used in the Pages Router.

```tsx
// app/page-client.tsx
"use client";

import { trpc } from "@/utils/trpc";

export default function HomeClient() {
  const { data } = trpc.hello.sayHello.useQuery();

  return <div>{data?.greeting}</div>;
}
```

If you're in a server component, you can use the `createAsyncCaller` helper from our `trpc/router/_app.ts` file.

```tsx
// app/page.tsx
import { createAsyncCaller } from "@/trpc/routers/_app";

export default function Home() {
  const caller = await createAsyncCaller();
  const { data } = trpc.hello.sayHello.useQuery();

  return <div>{data?.greeting}</div>;
};
```

## Wrap up

Using tRPC with Next.js App Router is a great way to build APIs for your app. In this article, we looked at how to set up and use tRPC with Next.js App Router. We created a router, middleware, and procedures. We also created a helper to create tRPC clients and a provider to wrap our root layout. We then looked at how to call procedures in our client and server components.

Happy coding!

## Resources

- [tRPC Documentation](https://trpc.io/)
- [Next.js App Router Documentation](https://nextjs.org/docs/app/api-reference/routing/app-router)
- [React Query Documentation](https://tanstack.com/router/latest)
