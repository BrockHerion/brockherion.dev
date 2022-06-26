---
setup: |
  import Layout from '../../../layouts/BlogPost.astro'
title: Using higher-order functions to build per-page layouts in Next.js
subTitle: Higher-order functions allow us to create an descriptionion over how we set up our page layouts.
slug: using-higher-order-functions-to-build-per-page-layouts-in-nextjs
description: This article will show you how to create per-page layouts in Next.js using a higher-order function.
isPublished: true
isFeatured: true
publishedOn: "May 12, 2022"
image: /posts/using-higher-order-functions-to-build-per-page-layouts-in-nextjs.webp
permalink: 'https://brockherion.dev/blog/posts/using-higher-order-functions-to-build-per-page-layouts-in-nextjs'
---

This article is a follow-up to a previous one I wrote about setting up per-page layouts in Next.JS with tRPC and NextAuth. You don’t have to read the original before reading this, but it has more background and setup code snippets. You can find it [here](https://www.brockherion.dev/blog/posts/creating-per-page-layouts-with-nextjs-typescript-trcp-and-nextauth).

## Per-page layouts rundown

Per-page layouts allow the React component tree to be maintained upon page navigation. The benefit here is our page state is preserved between navigation and creates a Single-Page Application experience for our users. You can add a page layout by adding a property to your page called `getLayout`

```tsx
// pages/home.tsx
export default function Home() {
  return <div>{/* Home page code */}</div>;
}

Home.getLayout = function getLayout(page: React.ReactElement) {
  return (
    <AppLayout>
      {/* You can have nested layouts! */}
      <HomeLayout>{page}</HomeLayout>
    </AppLayout>
  );
};
```

Then in `_app.tsx`, you just need to get your layout off the page and wrap your component in it

```tsx
// pages/_app.tsx
type NextPageWithLayoutAndAuth = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
  auth?: boolean;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayoutAndAuth;
};

export default function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout || ((page) => page);

  return getLayout(<Component {...pageProps} />);
}
```

You can find more information in the [NextJS docs](https://nextjs.org/docs/basic-features/layouts)

## Using a higher-order function

While the solution above works, it gets a bit tedious to manage when you have a handful of pages you’re managing that all have slightly different layouts. For example, I have an application with five possible layouts to use depending on the section of the app I’m in. Some are similar and just show different sub-navigation options while others show completely different layouts.

As you can imagine, this can get tedious to manage. I am now having to add 5-6 lines of code to each page and most of it is repeated. We can instead use a higher-order function to build our page layouts. A higher-order function is a function that either takes in functions as arguments or returns them as a result. We can create a higher-order function that takes a say, a layout name, and returns a function similar to `getLayout` that wraps our component.

> Could this be considered a higher-order component instead? <br/> I would argue that higher-order function is a more accurate term to use in this case. A higher-order component transforms a component into another component. According to the [React docs](https://reactjs.org/docs/higher-order-components.html), HOCs take in a component as an argument and return a new component. In our case, we are NOT passing a component into our function and are instead only returning a HOC.

Let’s see this in action by creating a new file called `withLayout.tsx` and adding a function inside it. We want our function to take in the name of the layout we want and the text to populate the page title with. In this example, we’ll have a normal layout and an authenticated layout.

```tsx
// components/withLayout.tsx
type LayoutType = "default" | "auth";

export default function withLayout(layoutType: LayoutType, title: string) {
  if (layoutType === "auth") {
    return function getLayout(page: React.ReactElement) {
      return <AuthLayout title={title}>{page}</AuthLayout>;
    };
  }

  return function getLayout(page: React.ReactElement) {
    return <DefaultLayout title={title}>{page}</DefaultLayout>;
  };
}
```

And that’s it! Of course, if you have more, you can always use a switch statement to improve readability, but this is the gist of it. Now, we can head over to one of our pages and use our higher-order function.

```tsx
// pages/home.tsx
export default function Home() {
  // Normal react stuff
}

Home.getLayout = withLayout("default", "Home");
```

Now we have a nice, clean way of managing various shared layouts between all of our pages.
