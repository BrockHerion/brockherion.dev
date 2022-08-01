---
layout: "../../../layouts/BlogPost.astro"
title: Creating Per-Page Layouts with Next.JS, Typescript, tRCP, and NextAuth
subTitle: tRPC and NextAuth are two powerful libraries that, combined with per-page layouts, let you create fast and powerful NextJS Apps.
slug: creating-per-page-layouts-with-nextjs-typescript-trcp-and-nextauth
description: In this article, I will be showing you how you can use NextJS Per-Page layouts with Typescript, NextAuth, and tRPC to build shared layouts.
isPublished: true
isFeatured: true
publishedOn: "January 7, 2022"
image: /posts/trpc-next-per-page.webp
permalink: "https://brockherion.dev/blog/posts/creating-per-page-layouts-with-nextjs-typescript-trcp-and-nextauth"
---

I've been working on an application that has quite a few changing layouts. There's an overall layout that is shared between all pages and each page has its own sub-layout that changes depending on what kind of content you are viewing. This will only grow in complexity as more pages are added.

The original version of this app I had built in Angular, so having nested layouts like this was a breeze. I would create a layout, slap a `<router-outlet>` in there, and call it a day. This would let my existing layouts stay the same upon navigation, so the only content that would need to be rendered again was content I was passing to my outlet. In Next, however, pages and routes are built out by what's underneath the /pages folder. The concept of an outlet like in Angular doesn't exist in Next.

Next does give you a few choices for handling layouts within your applications, first is a completely shared layout for all pages. This is simple enough, as you wrap your MyApp component in `_app.tsx` with the layout you want. This works really well if you have a common layout that all your pages will use and share.

The other solution it gives is to use a layout per page, which is what we will be discussing in this article. We will be looking at why you would want to use this solution, how it works, and how to make it work with NextAuth and tRPC.

## What Problem Does This Solve?

According to the Next docs, this solution aims to solve the issue of multiple and complex layouts. Per their docs,

> If you need multiple layouts, you can add a property `getLayout` to your page, allowing you to return a React component for the layout. This allows you to define the layout on a per-page basis. Since we're returning a function, we can have complex nested layouts if desired.

This also lets us persist things like page state when we switch pages. This is something that is crucial to minimizing latency and helping with performance. Your app will feel like a Single-Page App, although it technically isn't.

You might be tempted to do something like this

```jsx
export default function HomePage() {
  return <MyLayout>{/* Your page structure */}</MyLayout>;
}
```

This works to an extent. For simple layouts, it's not that big of a deal. For larger and more complicated layouts though, you can run into performance issues and things like page flickering upon loading. If your layout is maintaining some sort of state, like verifying if a user is logged in or making a server call, this will now be executed every time you navigate. It gets expensive to maintain.

This is why `getLayout` works. The page state is maintained and only components that have changed will be rendered again, instead of the entire page.

## Defining Layouts

The first thing you need is to actually have a layout that you want to use. I like creating mine under a /layouts folder, but you can choose whatever folder structure works for you and your project. I might have a few layouts like this.

```jsx
// MainLayout.tsx (Prop interface omitted if using JS)
interface Props {
  children: React.ReactNode;
}

export default function MainLayout({ children }: Props) {
  return (
    <body>
      <MainHeader />
      <main>
        {children}
      </main>
      <MainFooter />
    </body>
  );
}

// AltLayout.tsx
interface Props {
  children: React.ReactNode;
}

export default function AltLayout({ children }: Props) {
  return (
    <body>
      <AltHeader />
      <main>
        <Sidebar />
        {children}
      </main>
      <AltFooter />
    </body>
  );
}
```

The point is that how you have your layouts doesn't matter too much. You can make them whatever you want and add whatever stylings you want to them as well.

## Apply Layouts to Your Pages

Our next step is to actually apply a layout to a page. Let's go into one of our pages and give it a layout.

```jsx
// pages/main-page.tsx
export default function MainPage() {
  // Nothing to see here, just normal React stuff
}

// Here's the spice! (Omit React.ReactElement if use JS)
MainPage.getLayout = function getLayout(page: React.ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};
```

Our second page can be done very similarly.

```jsx
// pages/alt-page.tsx
export default function AltPage() {
  // This is not the code you're looking for
}

// More spicy!
AltPage.getLayout = function getLayout(page: React.ReactElement) {
  return <AltLayout>{page}</AltLayout>;
};
```

At this point, we have our layouts applied to the pages we want. But how do we render them? Let's hope over to `_app.tsx` and see how that's done with tRPC and NextAuth!

## Bringing it all Together with NextAuth and tRPC

The first thing that we want to do if we're using Typescript is to create two new types. We'll be using these to expand on `NextPage` and `AppProps`.

```ts
// pages/_app.tsx
type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};
```

With this in place, we can now update our MyApp component to use our custom types and to get NextAuth setup correctly.

```jsx
function MyApp({
  Component,
  pageProps: { session, ...pageProps },
}: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);
  const layout = getLayout(<Component {...pageProps} />);

  return <SessionProvider session={session}>{layout}</SessionProvider>;
}
```

This looks a little bit different than in the Next docs. You'll notice that instead of returning `getLayout(<Component {...pageProps} />);`, we are instead storing it in a variable called `layout` first. This is done for two reasons. First, if you try something like this, might see an error from NextAuth.

```jsx
return getLayout(
  <SessionProvider session={session}>
    <Component {...pageProps} />
  </SessionProvider>
);
```

Your pages need to be wrapped in a session in order to use the `useSession()` hook. In my case, I have it in my header, as I need to render different content depending on if the user is logged in or not. The error here is coming from the fact I'm wrapping my _page_ in the `<SessionProvider>`, not my layout. Getting and nesting the layout within `<SessionProvider>` solves this issue.

The second "issue" this solves is specifically for Typescript users. Notice the return type in `NextPageWithLayout`. The `withTRPC` HOC has us passing in `MyApp` into it. It does _not_ like MyApp returning a component with a type of `React.ReactNode`. You could change the return type, but wrapping and returning the layout with the NextAuth `<SessionProvider>` actually takes care of this issue, as now MyApp is returning a type of `JSX.Element`. The rest of tRPC setup and configuration should remain the same.

If you're not using NextAuth, you'll have to update `getLayout` to return something like `React.ReactElement` in order to make tRPC happy. Please note that I'm not sure if there are any side-effects to using ReactElement instead of ReactNode. The official Next docs use ReactNode and it is what I use most when returning components as it has a wider coverage of possible types. I would assume it would still work as expected, but I haven't done enough testing to find out. And if I'm way off on using one or the other, please let me know!

## Wrap-up

In this article, we looked at how to set up per-page layouts in NextJS and how to use them with NextAuth and tRPC. We also looked at what problem this pattern solves and why we would want to use it. These are some amazing technologies and using them together lets you not only build more reliable and more powerful sites faster but create unique and seamless user experiences.

Thank you so much for reading. I would love to hear your throughs and feedback on it. If you found this helpful, I would really appreciate you sharing this.

Happy coding!

Further reading:

- [NextJs Docs](https://nextjs.org/docs/basic-features/layouts)
- [tRPC](https://trpc.io/)
- [NextAuth](https://next-auth.js.org/)
