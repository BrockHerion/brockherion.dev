---
title: "Setting up React Query in a Next.js application"
description: "This article shows you how to set up and using React Query in a Next.js application"
keywords: "JavaScript, Nextjs, React, React Query, TypeScript"
isPublished: true
publishedOn: "January 27, 2024"
---

> Note, this article assumes you’re using Next.js 13+ and using the app router

I recently published an article on [how to setup and use react query in a Remix application](https://brockherion.dev/blog/posts/setting-up-and-using-react-query-in-a-remix-application/). As I primarily use Next.js for building web applications, I figured it was only fair I do a similar article.

In Next.js, the now standard way of interacting with data is with server components and server actions. While, I prefer this pattern over Remix, there are still times when you may need to fetch data from on client.

So today, we’ll take a look at how you can setup and use React Query in your Next.js applications.

## Initial setup

The first thing we’ll need to do is install the latest version of React Query

```bash
npm i @tanstack/react-query
```

Next, we need to create a new component to register our query provider in. This component is a client component. You would also register any other providers you might have in this file as well.

```tsx
"use client";

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

export default function Providers({ children }) {
  const [queryClient] = React.useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
```

Now in our root `layout.tsx` file, we can use our new `<Providers />` component.

```tsx
import Providers from "./providers";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head />
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
```

## **Using React Query**

In the Remix article, I explained React Query is based around queries and mutations. Queries are used for fetching data and mutations are used for modifying data.

To fetch data, we use the `useQuery` hook like so.

```tsx
"use client";

function getApiData() {
	// Calls some API and returns the data
}

export function SomeComponent() {
	const { data: myData } = useQuery({ queryKey: "myData", queryFn: getApiData });

	return <div>{myData.someField}</div>;
}
```

Notice the `use client` directive at the top of the file. We can only do queries and mutations in client components. There are, however, ways to prefetch or hydrate our queries with data from the server, which I will show later on.

Likewise for mutations, we can do the following.

```tsx
"use client";

function postData() {
	// Calls some API and updates data
}

export function SomeComponent() {
	const { data: myData } = useMutation({ 
		mutationFn: postData,
		onSuccess: () => {
			console.log("Success!");
		}
	});
}
```

## Hydrating our queries

React Query has built in support prefetch data on the server and send it along with our server components. Our data is sent along with our markup to be rendered, leading to less time waiting for things to load, resulting in a better user experience. And, if our server data is stale, React Query will automatically refetch the query on the client.

There are two ways we can do hydrating in Next.js. The first way involves setting the queries initial data argument.

```tsx
// app/page.tsx
import { ToDos } from "./to-dos";

async function getToDos() {
	// Returns some data we want to render
}

export default async function MyPage() {
	const initialData = await getToDos();

	return <ToDos initialData={initialData} />;
}

// app/to-dos.tsx
"use client";

import { useQuery } from '@tanstack/react-query';

function fetchToDos() {
	// Fetches from API
}

export function ToDos(props: { toDos: ToDo[] }) {
	const { data } = useQuery({
    queryKey: ['todos'],
    queryFn: fetchToDos,
    initialData: props.toDos,
  });

	// Render your component
}
```

While this approach is simple and straightforward, we can get into issues with prop drilling. To avoid that, we can take advantage of the `<Hydrate />` component.

First, we need to create a singleton of our query client.

```tsx
import { QueryClient } from '@tanstack/react-query';
import { cache } from 'react';

const getQueryClient = cache(() => new QueryClient());
export default getQueryClient;
```

Next, we’ll create a hydrated component that contains our prefetched data.

```tsx
import { dehydrate, Hydrate } from '@tanstack/react-query';
import getQueryClient from './getQueryClient';

export default async function HydratedToDos() {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery({ queryKey: ['toDos'], queryFn: getToDos });
  const dehydratedState = dehydrate(queryClient);

  return (
    <Hydrate state={dehydratedState}>
      <ToDos />
    </Hydrate>
  )
}
```

Finally, we update our original `<ToDos />` component.

```tsx
"use client";

import { useQuery } from '@tanstack/react-query';

function fetchToDos() {
	// Fetches from API
}

export function ToDos() {
	const { data } = useQuery({
    queryKey: ['todos'],
    queryFn: fetchToDos,
  });

	// Render your component
}
```

## Wrap up

In this article, we looked at how to setup and use React Query in our Next.js applications. We also looked at how to hydrate our queries on the server and use them on the client.

For more information, checkout the resources I’ve linked below. And if you want to get in touch, you can find me on Twitter (X) **[@BrockHerion](https://twitter.com/BrockHerion)**.

Thanks for reading and happy coding!

## Resources

- [React Query documentation](https://tanstack.com/query/latest/docs/react/overview)
- [Server Rendering & Hydration in React Query](https://tanstack.com/query/latest/docs/react/guides/ssr)
- [You Might Not Need React Query](https://www.notion.so/Setting-up-and-using-React-Query-in-a-Remix-application-57364891bd2946ebbeb7104970ce22af?pvs=21)