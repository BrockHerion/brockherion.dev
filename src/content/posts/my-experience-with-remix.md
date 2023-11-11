---
title: "My experience with Remix as a Next.js developer"
description: "An overview of my experience using Remix as somebody who primarily uses Next.js."
keywords: "nexjs, javascript, typescript, remix, react"
isPublished: true
publishedOn: "November 11, 2023"
---

> Big thank you to [LinkUp|QR](https://linkupqr.com) for sponsoring this post! With features like digital business cards and in-depth network analytics, LinkUp makes it incredibly easy to grow your network. And if you use code 'BROCK10' at checkout, you get 10% off! Thank you again LinkUp and enjoy the article.

I've spent the past two months working on a freelance project in which I've porting a .NET Framework application to a more modern platform. One part of this migration has been creating a new frontend application. For this task, I chose Remix. Now that the app is in production, I thought I would take this time to talk about my experience working with Remix coming from Next.js.

## Disclaimer

I hate that I even have to do this, but here we are. This is a very touchy topic and I want to be clear on my intentions here.

I wanted to write this after reading both Kent Dodds' and Lee Robinson's articles on why they use Remix and Next, respectively. Both were great reads and give some really in-depth arguments for each. I'm not doing that in this article. I am instead focusing on my experience working with Remix from a Next.js background.

I'm not going to bash on Remix here, but I will criticize it. I like Remix, and have enjoyed my experience working with it. But there are parts of it that don't really vibe with me. I have similar thoughts on Next.js where as a whole I really like it, but have some issues with some areas. What I am going to do is talk about what my experience has been with Remix and how it compares to Next.js. I will include some examples from each, but will try to be as brief and concise as a I can. I will also only talk about the main differences I encountered. To say there's a lot to unpack here would be an understatement.

There will be references to the Next pages router, Remix, and the Next app router. I'm doing this to show how each framework has influenced the other. Having this kind of competition is great because it means these tools are always growing and evolving. We developers can only win from this, as it makes our jobs of building great products easier.

Both Next and Remix are perfectly capable frameworks for building web applications, so use what makes you happy.

## Background

I've been using Next.js for years now and have taken multiple applications to production with it, first working with the pages router and now with the app router. I really like Next and the developer experience it provides. It's a wonderful solution for building web applications. That said, there's a few reasons that I picked Remix for this project.

As I mentioned earlier, this project was a modernization of a .NET Framework application. The client already had their infrastructure setup in Azure. Wanting to not introduce any unnecessary new complexities into the setup, I decided to redo the backend in .NET 7. Because the frontend also needed to be hosted in Azure, I wanted something would easy to deploy there.

Remix fit that bill nicely. Next on Azure App Service or React with Vite on Azure Static Sites would have also worked, but I really like just how portable Remix is. I also had been wanting to give it a try for some time, just to see how it compared to Next. I love learning and working with new tech, so this app gave me an opportunity to build and take a real app to production with Remix.

## Routing

The first thing I want to look at is routing. The Next pages router uses file-based routing, where any component you have under the `/pages` folder will be a route. Adding a folder will also create that route, provided you have some kind of component underneath it. For the app router, Next uses directory-based routing where any file under `/app` called `page.tsx` gets built as a route.

Remix, specifically version 2, uses a flat-file based routing system. In your `/app/routes` folder, you create new routes by adding new components. But unlike the Next pages router, creating a nested route is done using a period delimiter in your file name. For example, if I wanted to create a `/settings/general` route in my Remix app, I would add a new file called `settings.general.tsx`.

For the most part, I really like this. On the one hand, I love seeing all my routes in one place. It gives me a clear picture of my routes and makes finding the pages I need a lot simpler. It also makes refactoring routes a lot simpler. Instead of moving files between directories, I can just simply rename the file.

On the other hand, you can get some pretty long file names depending on how deep your routes are. As an example, let's say we have an app where we manage teams that are apart of an organization. If I wanted to create a route to manage team members, I could do something like `settings.teams.$teamId.members.tsx`. That route is four levels deep. What if we need a sub-page to members? It's really a matter of preference, do you want long file names or nested folders with a bunch of `page.tsx` files?

I won't go too deep into the differences between dynamic routes. Next uses `[slug]` for it's routes, while Remix uses `$slug` for theirs. There's not really any difference in practice, so I don't have an opinion on either.

As a whole, I prefer the Remix approach to it solely in a purely routing regard. Next, especially in the app router, can get pretty messy with it's folder structure. And good luck searching for a specific page when all your pages are `page.tsx`. However, when it comes to a total routing experience, I still prefer the Next app router. The main reason for that is layouts.

## Layouts

Here is where the Next app router approach shines and why I prefer it as a whole. Pre-app router, doing layouts in Next.js was not an easy thing. You could wrap your main component in `_app.tsx` in a shared layout, but what if your sub-routes had their own layouts? You either ended up wrapping each route in a shared, specific layout component, or using something like a higher-order function to share it across routes. Not a great experience.

The app router made layouts far easier to reason with. A `layout.tsx` is a component that wraps every single page in a, well, layout. A layout will apply to every route at that level and underneath it. Layouts can also be nested, letting you create different layouts for different routes.

Things get even better with route groups. Route groups let you break routes/segments into groups without impacting URL structure. This gives you an even finer grain of control over your layouts. You can opt specific routes into a layout, create multiple root layouts, and more. It's a massive improvement over how layouts worked in the pages router. There's also the benefit of being able to co-locate components, which is a really helpful thing when dealing with client and server components.

Remix falls somewhere in the middle. Setting up and using nested layouts is a pretty simple process. You create a file with your route name and simply use `<Outlet />` in your component. So a simple layout would look something like this:

```tsx
// routes/settings.tsx
import { Outlet } from "@remix-run/react";

export default function SettingsRoot() {
  return (
    <div>
      {/* Other shared JSX for the settings pages */}
      <Outlet />
    </div>
  );
}
```

Then, to create an actual `/settings` page, you just add a new file called `settings._index.tsx` (`_index.tsx` is a special file that denotes root paths in Remix).

To be honest, this threw me off for a little bit. Once I got used to it though, I didn't find it to be that bad. What I did find limiting was having unique, route-level layouts. Next route groups make this really easy to do. For example, if I want to have a root path be one layout, but all the sub-paths be another, I could easily do this with a route group and `layout.tsx` files.

Not so much in Remix. For example, I wanted to give my checkout pages a different layout than the rest of the app. To do this, I would have had to uproot all my layouts in `root.tsx` and do something like a custom page wrapper. I then would have had to have wrapped every page that wasn't checkout in said wrapper. That was far more work than I was willing to do, so I left the layout alone and built checkout with it.

For that reason, I'll put up with a bunch of `page.tsx` files. The Next app router just gives me so much more flexibility in creating user experiences. It's not that remix can't, and again I do really like the flat-file route naming, but Next just makes it a lot easier.

## Data fetching and mutations

This is a big one. In the Next pages router, we had a few options for dealing with data. There's the traditional SPA way with client-side fetch requests, `getServerSideProps` for SSR, and `getStaticProps` for SSG. There are also solutions like tRPC, which is my preferred method for data fetching and mutations in  the pages router.

Keeping tracking of when to use what wasn't the easiest thing. Remix, by contrast, is a far simpler model to understand. There's two methods you need to remember: `loader` and `action`.

`loader` is pretty self explanatory: it's what gets called when the page loads. It runs on the server, meaning you can do things like query a database or make a call to an external API. `action` is similar, except it's what's executed when you submit a form to that route. Within both of these methods, you can do things like return JSON, redirect to another URL, or throw an error. To then use said data in your component, you would use the `useLoaderData` or `useActionData` hooks provided by Remix.

It's a pretty simple model and one that I like for the most part. My one gripe is with errors, which I'll touch on a bit later, but as a whole it's a really easy model to work with and understand. One thing to note is these methods are also only available in page routes and layout files, meaning any components that need data either need to do so with props or a client-side fetch to an API.

This is well and fine, and the following bits are not a slight against Remix at all. But the app router has server-side components, and they're just too good. By default, the app router treats all components as server unless you explicitly mark it as a client component. Server components allow you to do data fetching on the server, and it's not just limited to pages.

Server components are a fantastic developer experience. There is a mental-model shift when working with them, but once you get used to it it's hard to go back. I want to emphasize that the Remix model isn't bad at all, it's very good. It's just Remix hasn't adopted server components (yet).

The app router deals with mutations in the form of server actions, which do have an advantage over the `action` method, at least to me. Because Remix using one `action` per page, and by default forms POST back to that action, managing multiple forms can be tedious. You would need to define multiple actions and set each form to post back to that specific action. This is not the case with server actions. You would simply pass the action to each form, like so

```tsx
function action1(data: FormData) { }

function action2(data: FormData) { }

export function MyForms() {
  return (
    <>
      <form action={action1}></form>
      <form action={action2}></form>
    </>
  );
}
```

As a whole, I prefer the Next app router experience. Server components and actions are a real game-changer for building apps. The Remix model is completely fine, I don't have many (if any) things I wish were better with it. I simply like the model the app router gives more.

## Error handling

My last major point on this is error handling. I mentioned earlier how I'm not a huge fan of how it works in Remix and there's a few reasons for that.

Remix out of the box provides each of your pages with an error boundary, letting you define what information you want to show when an error occurs. This is done by creating an `ErrorBoundary` component that's used to catch errors. I actually really like this bit. It keeps my main component logic split from what happens when an error occurs.

There are a few things I hit with this model that were really frustrating. Let's say I have a loader like this

```ts
import { type LoaderArgs, json } from "@remix-run/node";


export const loader = async ({ request }: LoaderFunctionArgs) => {
  const res = await fetch("some-url");

  if (res.ok) {
    return json({ ...(await res.json())});
  }

  throw json({ status: res.status });
}
```

I would simply define my `ErrorBoundary` component and show a message depending on the status. Here's the catch: `ErrorBoundary` will override my page. So if I wanted to show a banner on top of the page, I would have to extract my page to its own component, give it an optional prop for `error`, and return that from my default export and my error boundary.

What makes this quirkier is `loader` never runs for `ErrorBoundary`. Let's pretend the example above isn't a `loader`, but an `action` and I want to show an error that occurred during submission. If my component is reliant on data from `loader`, this breaks.

The way around that would be to tweak the `action` slightly to return json instead of throwing it. Catch is, TypeScript can get really finicky about it. My experience has been TypeScript gets confused pretty easily when your json structure differs at each return. This is not really a Remix issue, but a TypeScript thing. The fix here would be to simply return the same object for each result, something like

```ts
if (res.ok) {
  const data = await res.json()
  return json({ status: res.status, error: null, data: data});
}

return json({ status: res.status, error: "Oopsies", data: null});
```

This works well and usually what I do when I need to handle errors in my pages. Now I don't need an `ErrorBoundary` and can just show my banner with my error message. I will say this pattern feels strange, given there's a clear separation as to what `return` and `throw` mean context-wise.

The app router has a similar pattern, where you create an `error.tsx` file that takes care of error handling for you. I do really like that Next provides you with a `reset` function to try and re-render the page, but I'm sure you could set something similar up in Remix with its `useNavigation` hook. Having the error boundary be a separate page also helps prevent some of the foot guns I had trying to work with the Remix `ErrorBoundary`. As for showing client-side error messages, it's a similar story of letting the page component handle the error instead throwing it and letting the error page handle it.

## Wrap up

Phew, that was a lot. Again, I wanted to focus on the major differences I experienced coming from Next to Remix and express my thoughts on them. In summary, Next and Remix were a lot closer than I thought. They share a lot of the same core ideas and concepts, but are executed differently.

As I mentioned in the intro, it's really cool seeing how these frameworks push each other to grow and evolve. Next 13+ clearly takes some inspiration as to how Remix does things, and in my opinion, that's for the better.

What it comes down to is a matter of taste. You might prefer the flat-file routing, using `loader`, `action`, and `ErrorBoundary` within your pages, and the plethora of deployment options Remix gives. On the other hand, you might prefer the bleeding-edge tech in Next, it's layout and error handling, and built-in routes/APIs.

For me, I prefer Next.js and that will continue my choice for building web apps for the foreseeable future. Server components are a hard thing to leave behind, along with layouts, route groups, API routes, and all of the other things Next gives you for building your apps.

On the other hand, there's a elegance to Remix that makes it a very attractive option. It's focus on simplicity and stability makes it a wonderful choice to build in as well. I do plan on tinkering with Remix more and will of course be maintaining this application with it. Who knows, I may even pick it back up for another project!

Whichever you pick, you can't go wrong! Both are excellent frameworks for building production-ready, high quality applications. Use whatever makes you happy.

## Resources

- [Remix Quick Start](https://remix.run/docs/en/main/start/quickstart)
- [Next.js Getting Started](https://nextjs.org/docs)
- [Why I won't use Next.js - Kent C. Dodds](https://www.epicweb.dev/why-i-wont-use-nextjs)
- [Why I'm Using Next.js - Lee Robinson](https://leerob.io/blog/using-nextjs)
