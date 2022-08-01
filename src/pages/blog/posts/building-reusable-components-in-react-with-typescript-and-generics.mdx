---
layout: "../../../layouts/BlogPost.astro"
title: Building Reusable Components in React with Typescript and Generics
subTitle: How to use Typescript generics to build more reusable, more robust React components.
slug: building-reusable-components-in-react-with-typescript-and-generics
description: In this article, I will be showing you how you can use Typescript generics to build reusable and more robust components for your React applications
isPublished: true
isFeatured: false
publishedOn: "Febuary 6, 2022"
image: /posts/react-ts-generics-min.webp
permalink: "https://brockherion.dev/blog/posts/building-reusable-components-in-react-with-typescript-and-generics"
---

I'll be honest with you all, I'm kind of a neat freak about my code. I like having things be as simple as they possibly can be. I enjoy writing code once that I can use repeatedly. Out of all the SOLID principles, the one I try and follow most closely is the Single-Responsibility Principle, where each class, module, and method is responsible for one thing and one thing only. It really helps keep everything organized and optimizes for code longevity.

Now imagine my dismay when I realized that I was repeating a lot of code across various pages in a few of my NextJS apps. For example, one app I'm working on has various settings screens for different areas of the application. All of them share the same overall structure:

- Get the object I need to edit (either from a store or from an API call)
- Do a quick check if I need to return a loading state or not
- Return the page, all of which had a similar tab structure with slight
  variations

It's the same thing with my listing pages:

- Get the data I need from somewhere
- Do some stuff with hooks to get the page set up the way I need
- Return the list, each of which is, again, very similar with only slight differences

I decided enough was enough. I was tired of writing basically the same code over and over. After a bit of refactoring, I finally created a system for myself to reuse all of this logic and reduce not only my lines of code for each page but the time it took to create one.

In this article, I am going to share with you how to build reusable components for your React applications using Typescript generics.

## What is a generic?

Most modern type-safe languages include some form of generics and Typescript is no exception. Generics are a great way to let you build reusable components for your application that are not bound by a specific type.

One important note here about Typescript specifically is that generics are NOT the same as `any`. With `any`, you lose your type information while with generics, your types are persisted.

Let's take a look at a simple example. Let's say you want a function to get the total number of elements in an array. Traditionally, you would do something like this

```ts
function getArrayLength(arr: string[]): number {
  return arr.length;
}
```

That's fantastic, but what if we need to check an array of numbers? Maybe we'll need to check an array of objects later on. So our implementation here is not very good as it only covers arrays of strings.

How about with `any`?

```ts
function getArrayLength(arr: any[]): number {
  return arr.length;
}
```

Great, but now we've lost our type-safety on `arr`. This is where generics come in. Let's how this would be written as a generic function

```ts
function getArrayLength<T>(arr: T[]): number {
  return arr.length;
}
```

If this looks a little funky, don't worry. We're saying here our function accepts a generic argument called `T`, where `T` is the type of the array. So arrays of numbers, strings, booleans, objects, etc. will now all work with this function.

I won't go into too much more detail on how generics work, but if you want to learn more, you should head over to the [Typescript Documentation](https://www.typescriptlang.org/docs/handbook/2/generics.html) and read their guide on it. It's really well done and provides some more in-depth examples.

## Building our page structure

Let's had into React-land and see how we can use generics to build out a listing page. We can assume that we will need to use reuse our listing component for various parts of our app.

The page we will be rendering will have a very simple structure

```ts
// page.tsx

export default function Page() {
  // 1. Get data
  const { data } = useData();

  // 2. Check data
  if (!data) {
    return <Loading />;
  }

  // 3. Return our page
  return {
    /* Render out our list here */
  };
}
```

How the list is currently set up doesn't matter too much, but essentially what we're doing is fetching our data and then returning our list. We can assume our list is hardcoded and we have it duplicated on multiple pages. For simplicities sake, I also moved our data fetching and page setup to a custom hook. The implementation also does not matter here so long as we have data we can pass to our list.

## Creating a list component

In our components section, let's go ahead and create a new file for our list component. We'll also make it generic so it can accept multiple types.

```ts
// Listing.tsx

type ListingProps<TItemType> = {
  items: TItemType[];
}

export default function Listing<TItemType>(props: ListingProps<TItemType>) {
  return (
    <ul>
      {props.items.map((item, index) =>
        (<li key={`item-${index}`}>{/* Item structure */}</li>)}
    </ul>
  );
}
```

Awesome, we have a generic component to use for listing our items out. Let's head back over to our page and add this in.

```ts
// page.tsx

export default function Page() {
  const { data }  = useData();
  ...
  return <Listing items={data} />;
}
```

If you look closely, however, you will realize there's an issue with how this is set up. How does our list know what to render? If we have primitive types, like strings and numbers, this isn't an issue and we can render each as-is. But what about objects? Say I have one page that lists employees and another that lists quarterly totals. My `QuarterlyTotals` object won't have a `firstName` or `lastName` property, nor will my `Employees` have a `netRevenue` property. My types won't always have the same properties so how I can render my list?

## Adding a render() prop

We can take advantage of `props` to fix this issue. Hop back into `Listing.tsx` and let's add a new prop called `render`.

```ts
// Listing.tsx

type ListingProps<TItemType> = {
  items: TItemType[];
  render: (item: TItemType) => React.ReactNode;
}

export default function Listing<TItemType>(props: ListingProps<TItemType>) {
  return (
    <ul>
      {props.items.map((item, index) =>
        (<li key={`item-${index}`}>{props.render(item)}</li>)}
    </ul>
  );
}
```

What we've done here is added a generic render prop to our listing component. In our component, now all we need to do is call `props.render(item)` and we now have a totally generic list component. Our `items` prop is a generic array of TItemType and our `render` prop dictates how to render TItemType.

Let's head back to our page and update our list there.

```ts
// page.tsx

export default function Page() {
  const { data } = useData();
  // omitted

  return (
    <Listing
      items={data}
      render={(item) => (
        <>
          <span>{item.someProperty}</span>
          ...
        </>
      )}
    />
  );
}
```

Now we can render each item in our list without having to worry! Our page is dictating what data goes into the list and how that data gets rendered. Our listing component is acting as a wrapper for us. It's a predictable structure as to how our list should look and behave. Whenever we need a list now, we can just use our `<Listing />` and just pass our props in!

## Going forward

There's a ton more you can do to this. In my own app where I built a similar list, I also needed to add search functionality to it. It will also eventually need other kinds of filtering as well. I can now just set up generic filtering and sorting on my list component and, as we did with rendering, let our page dictate how the searched through or filtered.

I've also added simpler props like list headers and things like that, as well as more complex things like modals. And I can always add more as my components need it. The benefit here is that because my list is now not dependent on a type, I can use it wherever I want so long as I tell what to do and how to present the data in it.

Of course, that can all be extracted away to other components or functions, but we have a structure in place now build on top of it in whatever way our application needs us to.

Play around with it and see what else you can make your components do!

## Conclusion

Today, we took a small look at what generics are and how to use them to build robust
and reusable React components. We saw just how simple yet powerful this can be and
how it can reduce both duplicated code and time spent coding.

As always, I really appreciate you taking the time to read this and I hope you found value in it. If you enjoyed this please feel free to share it or leave a comment with any feedback. I'm always open to discussions and suggestions. You can also connect with me on Twitter or visit me at [brockherion.dev](https://brockherion.dev]).

Happy coding!
