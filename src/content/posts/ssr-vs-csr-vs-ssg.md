---
title: "SSR vs CSR vs SSG: Which is right for your site?"
description: "Here are the differences between SSR, CSR, and SSG, and why you would choose one over the other for your web project."
keywords: "ssr, ssg, csr, client, server"
isPublished: true
isFeatured: true
publishedOn: "June 17, 2023"
---

In the world of of web development, there are three main types of rendering for your website. There's server-side rendering (SSR), client-side rendering (CSR), and static site generation (SSG). Each has their own pros and cons depending on what kind of website you're trying to build.

In this article, we'll take a look at how each of these work and explain why you would want to use one over the others for your web projects.

## Static site generation (SSG)

SSG is probably the simplest method to understand out of all of these. You build your code and get an output of HTML, CSS, and JavaScript. When you visit an SSG site, the page you request is rendered at build time and just waiting to be served to the client.

![Static site generation diagram](/posts/content/ssg.svg)

This has a few advantages, namely in performance, first load times, and SEO. SSG is a great option when you have page content that will very rarely change or page content that isn't dynamic, and when SEO is a concern. Some examples of sites that might take advantage of SSG are documentation or simple blogs, where your posts are static files. This site, for example, is using Markdown for all it's posts.

When you think about SSG, think about frameworks like Gatsby, Astro, or Hugo.

## Server-side rendering (SSR)

SSR is similar to SSG, except for the fact the you can have dynamic HTML content.This is because the page content is determined at runtime, not build time. When you make a request to get a page, the server will load all the data it needs, build the HTML, and then send to back to the client.

![Server-side rendering diagram](/posts/content/ssr.svg)

SSR shares a lot of advantages with SSG, but with the added benefit of having dynamic page content. This is great for things like e-commerce applications or more complex blogs, where your posts are stored in a database of some kind.

For SSR frameworks, you'll be looking at things like Django, .NET, NextJS, and SvelteKit.

## Client-side rendering (CSR)

Finally, we get to client-side rendering. CSR is the idea of letting JavaScript handle your sites rendering. When you request a page, you get back a very minimal HTML file and a JavaScript entry file. When that file it loaded, it handles rendering the UI, setting up routing, and more. This kinda of application is also known as a single-page application, or SPA.

Because you're using JavaScript to handle your entire site, your initial page load performance might suffer as your bundle grows larger. Once it is loaded however, it's very fast and gives a native-app like experience. You might also run into issues with SEO in CSR sites, as your page content is loaded and rendered via JavaScript instead of your HTML.

![Client-side rendering diagram](/posts/content/csr.svg)

CSR is a better choice for sites that are more application-like than a traditional website. For example, CSR would be a great choice for some kind of dashboard, where you could have a lot of data and need a lot of interactivity, and where SEO is generally not a concern.

Frameworks and tools you'll be using to build CSR apps include React, Vue, and Angular.

### A note about CSR frameworks

There are a few frameworks out there that let you do SSR using React (NextJS) or Vue (Nuxt). What I'm referring to with these in CSR is the process of using a JS compiler that takes your code and spits out a JS bundle you ship to the client. The simplest example of creating a CSR app would be create-react-app, although I don't recommend using that anymore. Vite is a much nicer tool to use for creating CSR React apps.

## Wrap up

Today we looked at SSG, SSR, and CSR. We looked at how each of those works and when you would want to use them. There is not one-size-fits-all solution to web development. Understanding what you're building and knowing the trade-offs of each approach will help you make the best possible choice for your website or application.
