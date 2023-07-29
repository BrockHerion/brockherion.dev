---
title: "Next.js - A simple fix for hydration issues"
description: "A simple solution to fixing Next.js hydration errors"
keywords: "nexjs, javascript, typescript, next hydration error, react"
isPublished: true
publishedOn: "July 29, 2023"
---

Hydration errors in Next.js can be some of the most frustrating errors to encounter. There's a number of reasons why you might be seeing it. In this article, we'll be looking at what hydration is, what causes these errors, and how you can fix them.

## What is hydration?

According to the Next.js docs,

> Hydration is when React converts the pre-rendered HTML from the server into a fully interactive application by attaching event handlers.

In other words, it's when your client-side JavaScript is loaded and attached to your page in the browser. During this time, it's important that the React component tree pre-rendered on the server matches the tree that's rendered during hydration.

## What causes hydration errors?

The Next.js docs list out a few reasons as to why you could be seeing this error. It can be things like improper nesting of HTML tags, trying to use browser APIs on the server, or browser extensions modifying page content.

For example, I recently ran into an issue with loading data from `localStorage` (via Zustand) that lead to this error every time I refreshed the page. I've also ran into it while trying to access the `window` object in a component. Both of these are part of browser APIs and do not exist on the server.

## How to fix these issues

The simplest way to fix these issues is to use a `useEffect` to run your code client-side. Because `useEffect` gets called during hydration, this will make sure that your server-rendered content matches the content on initial client load, thus preventing a hydration mismatch.

```tsx
import { useEffect, useState } from 'react';

export default function MyComponent() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true)
  },[])

  return <>{isClient ? "Client!" : "Server..."}</>
}
```

Here, "Server..." will be rendered initially, and "Client!" will be rendered once hydration has completed and the page is fully interactive.

## Wrap up

In this article, we learned about what hydration in React is, what causes hydration errors, and how we can fix them with a `useEffect`. Using this pattern, we make sure that our server-rendered state always matches the client. By ensuring hydration has completed before we start using things like using client-only code, we can avoid hydration errors and make sure our application state stays consistent.

## Resources

- [Next.js docs](https://nextjs.org/docs/messages/react-hydration-error)
- [React docs](https://react.dev/reference/react-dom/client/hydrateRoot)
- [Fixing Hydration Issues in Next.js and Zustand: A Simple Solution](https://medium.com/intelliconnect-engineering/fixing-hydration-issues-in-next-js-and-zustand-a-simple-solution-bd0a8deff6cc#:~:text=When%20we%20use%20Next.,and%20initialises%20the%20Zustand%20store.)
