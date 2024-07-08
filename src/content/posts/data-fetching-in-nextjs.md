---
title: Data Fetching in Next.js
description: A deep dive in the different ways you can fetch data in Next.js
isPublished: true
publishedOn: "July 7, 2024"
keywords: "nextjs, javascript, react query, api, server components"
---

I've been using Next.js for almost three years now. I've taken a few applications to production with it, experimented with different libraries and techniques, and watched how the framework has evolved.

One of the biggest areas Next has grown is in data fetching. There's a number of different ways you can fetch data for your apps, each with their own pros and cons.

## Client-side Fetching

One of the most tried and true ways to fetch some data is on the client. This pattern is not just for Next.js, but for any React app. A common setup looks something like this:

```tsx
"use client";

import { useState, useEffect } from 'react';

export default function MyComponent() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch('https://my-api.com/data')
      .then(res => res.json())
      .then(setData);
  }, []);

  return <div>{data}</div>;
}
```

This works, but is error-prone. The issue here is that there are other states we're not accounting for, such as loading or error. There's also the issue of having to manage the dependency array, dealing with promises within the `useEffect` hook, potential race conditions, network waterfalls, and more.

## React Query and SWR

There's a number of libraries that can help us avoid the issues of using `useEffect` to fetch our data, namely React Query and SWR. Both of these libraries include a features to make our lives easier, including error and loading states and caching and revalidation.

> **ℹ️ Note**
>
> React Query is not specifically for fetching data. It's an asynchronous state manager that can be used for any data fetching. It doesn't have an opinions on how you fetch your data. SWR, on the other hand, is specifically built for fetching data.

I prefer using React Query when I'm doing any sort of client-side data fetching. If we refactor our example above to use React Query, it would look something like this:

```tsx
"use client";

import { useQuery } from '@tanstack/react-query';

export default function MyComponent() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['my-data'],
    queryFn: () => fetch('https://my-api.com/data').then(res => res.json()),
  });

  return <div>{data}</div>;
}
```

## tRPC

Building on that, we can use tRPC to bridge the gap between client and server. tRPC let's use build a fully type-safe API for fetching data in our Next.js apps. On the client, tRPC uses React Query to fetch data. On the server, we can define procedures that act as our API endpoints.

On the server, we can define a procedure like so:

```ts
"use client";

import { procedure, router } from "../trpc";

export const myRouter = router({
  greet: procedure.query(({ ctx }) => {
    return { greeting: `Hello World!` };
  }),
})
```

And then on the client, we can use it like so:

```tsx
"use client";

import { trpc } from '../utils/trpc';

export default function MyComponent() {
  const { data, isLoading, isError } = trpc.myRouter.greet.useQuery();
  return <div>{data}</div>;
}
```

tRPC, to me, is still one of the best ways to fetch data in Next.js. It's type-safe, easy to use, works with both pages and app router (with some tinkering), and provides a great developer experience. That being said, I've been moving towards a new option in Next.js.

## Server Components

Server Components were introduced in Next.js 13. They're a React feature that allows you to fetch data on the server and stream the built HTML to the client.

```tsx
async function loadData() {
  const res = await fetch('https://my-api.com/data');
  const data = await res.json();

  return data;
}

export default async function MyComponent() {
  const data = await loadData();
  return <div>{data}</div>;
}
```

Server components changed the way we build out Next.js apps. They provide a number of benefits over traditional client-side fetching, including:

- Improved performance due to reduced client-side JavaScript
- No need to complex/error-prone `useEffect` hooks or having to introduce other state management libraries
- Less attack vectors for bad actors
- Better developer experience
- And more!

Now there are some cases where you might want to use client-side fetching. For example, I have an app where I show data in a dropdown based on a user's selection. In that case, it's much easier for me to make an API call as the user makes selections. For most other cases however, I've moved over to using server components.

## Wrap up

As you can see, there's a number of ways to do data fetching in Next.js. From using built-in hooks to dedicated libraries like React Query, to fetching data on the server via Server Components, there are a lot of options. My personal preference is to use Server Components for most cases, but should I need any client-side data fetching, I'll use React Query or tRPC. The great thing about Next.js is that it's flexible and allows you to choose the best approach for your use case.

## Resources

- [Data Fetching in Next.js](https://nextjs.org/docs/app/building-your-application/data-fetching/fetching-caching-and-revalidating)
- [Data Fetching Patterns](https://nextjs.org/docs/app/building-your-application/data-fetching/patterns)
- [You might not need useEffect](https://react.dev/learn/you-might-not-need-an-effect)
- [useEffect](https://react.dev/reference/react/useEffect)
- [React Query](https://tanstack.com/query/latest)
- [SWR](https://swr.vercel.app/)
- [tRPC](https://trpc.io/)
- [Server Components](https://nextjs.org/docs/app/building-your-application/data-fetching/server-components)
