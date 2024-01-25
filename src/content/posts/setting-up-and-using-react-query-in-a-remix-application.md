---
title: "Setting up and using React Query in a Remix application"
description: "This article shows you how to set up and using React Query in a Remix application"
keywords: "Node, React, React Query, Remix, TypeScript"
isPublished: true
publishedOn: "January 24, 2024"
---

The standard way of interacting with data in Remix is usually done on the server with `action` and `loader` functions. There are times, however, where you might want to perform these operations on the client instead. And where there are a number of ways to do this, the best way still is by using React Query.

In this article, I will be showing you how to setup React Query in your Remix application.

## What is React Query?

React Query is library that’s apart of the TanStack. It’s a state management library for working with remote data, like external APIs. It’s type-safe, provides caching and revalidation, and a lot more, all with minimal code. It is, in my opinion, the best way to do data fetching in React.

## Initial setup

First, we need to install React Query in our Remix application.

```bash
npm i @tanstack/react-query
```

Next, let’s go into our `root.tsx` file and setup our query client.

```tsx
// Other imports hidden
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

export default function App() {
	<QueryClientProvider client={queryClient}>
		<html lang="en">
			{/* Your root component */}
		</html>
	</QueryClientProvider>
}
```

And that’s all we need to start using React Query in our Remix application!

## Using React Query

React Query uses queries and mutations. Queries are used to fetch data and mutations are used to modify data.

Within our Remix application, either in a route or component, we can query data with the `useQuery` hook.

```tsx
function getApiData() {
	// Calls some API and returns the data
}

export function SomeComponent() {
	const { data: myData } = useQuery({ queryKey: "myData", queryFn: getApiData });

	return <div>{myData.someField}</div>;
}
```

Likewise, we use the `useMutation` hook to modify data.

```tsx
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

## Wrap up

In this article, we looked at how to setup and use React Query in our Remix application. React Query gives us a powerful, yet flexible interface for managing remote data in your React applications.

For more information, checkout the resources I’ve linked below. And if you want to get in touch, you can find me on Twitter (X) [@BrockHerion](https://twitter.com/BrockHerion).

Thanks for reading and happy coding!

## Resources

- [React Query documentation](https://tanstack.com/query/latest/docs/react/overview)
- [Server Rendering & Hydration in React Query](https://tanstack.com/query/latest/docs/react/guides/ssr)
- [You Might Not Need React Query](https://www.notion.so/Setting-up-and-using-React-Query-in-a-Remix-application-57364891bd2946ebbeb7104970ce22af?pvs=21)