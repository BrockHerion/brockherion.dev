---
layout: "../../../layouts/BlogPost.astro"
title: I rebuilt my Next.js site in Astro. Does it live up to the hype?
subTitle: I spent a few hours rebuilding this Next.js site in Astro. Here's how my experience was with it and my thoughts on Astro as a whole.
slug: i-rebuilt-my-site-in-astro
description: I spent a few hours rebuilding this Next.js site in Astro. Here's how my experience was with it and my thoughts on Astro as a whole.
isPublished: true
isFeatured: false
publishedOn: "June 28, 2022"
image: /posts/i-rebuilt-my-site.webp
permalink: 'https://brockherion.dev/blog/posts/i-rebuilt-my-site-in-astro'
---

Anybody who knows me knows that I love Next.js. It's a great framework for building React apps that, combined with Vercel, provides a fantastic developer experience. This weekend, however, I was introduced to Astro through a new Fireship.io video. I'd heard about Astro a few times but never did anything with it. Curious as to what the hype was about, I decided to port [brockherion.dev](https://brockherion.dev) over to Astro.

Before I get into my experience, I will not be comparing the nitty-gritty technical aspects of each framework. I will give some differences as it's relevant to my experience, but this is not a Next vs Astro article. I am simply sharing what using Astro for me was like and why I plan on sticking with it for this specific project. You can read more about the differences between Next and Astro on the [Astro Docs](https://docs.astro.build/en/comparing-astro-vs-other-tools/#nextjs-vs-astro).

Now, on with the show!

## Motivation

As I wrote in a [previous article](https://brockherion.dev/blog/posts/how-i-built-brockherion-dev), my site was built using Next.js, TailwindCSS, and TypeScript. I picked this stack due to how easy it was to actually build a nice-looking site. It's also the stack I'm most comfortable using as I've been using these technologies for a while now.

While I love Next.js for building highly interactive sites, I found it a bit frustrating getting set up for solely static content, specifically from markdown files. I brought in a few  `npm` packages to handle things like parsing frontmatter. While it certainly made things easier, getting my markdown pages to render still took a decent amount of work on my end. This wasn't the end of the world though, especially once all of my components were set up.

Another small gripe is actually deploying the site. I'm using Vercel for hosting and they make it incredibly easy to deploy your sites. Build times, however, were anywhere from 30 seconds to a bit over a minute. Again, this isn't anything to lose sleep over but did get a little annoying. This was especially true if I was fixing something very small, say a single typo in a blog post.

With Astro being a tool for building mostly static sites, I was curious as to how it performed to Next. However, I was less interested in raw performance. Next does support static site generation and does it very well. Once deployed, my Lighthouse scores are consistently between 90 and 100 for the Next version of the site. This is also the case for the Astro version.

What I wanted to know was how the developer experience was. Could my pain points with my Next setup be resolved by Astro?

## Porting brockherion.dev

I spun up a new Astro project with the blog template and support for Tailwind and React. Astro is nice in that it supports multiple UI frameworks including React, Vue, and Svelte. My original plan was to move all my React components over from the Next version over to here and do an exact 1-1 port. This would have been the best-case scenario for testing raw performance, but again, I was less concerned with that. I took the opportunity to fix up the UI a bit and make it a bit more cohesive. So while the layout is slightly different, the content itself is more or less the same.

What I was surprised by was how intuitive Astro's syntax was. While I could have used JSX components, I decided to give the Astro components a try and ended up really liking them. They're similar enough to JSX where I was able to pick them up relatively quickly. I also realized some of the components I created in Next might have been a little overkill. I ended up simplifying my page and component structure a bit and cleaned up some of the technical debt I had laying around.

Within a few hours, I had all my pages (minus the projects page) and blog articles moved over. It didn't take me long at all to move my content over and took me even less time to fix some of the issues I had with my previous setup. After a bit of image optimization and slight tweaking to my SEO setup, I was ready to deploy the site.

## Is Astro worth the hype?

I'll start by saying I was really impressed with how easy it was to start picking up Astro. As I said before, it was similar enough to JSX to feel familiar to me. That said, I really appreciate that I could have used React components if I really wanted to. If the site was larger, this would have made transitioning over a smoother process.

Second, I appreciate that Astro treats markdown files as pages. This is not the case in Next, where instead you have to use `getStaticProps` and `getStaticPaths` to get your markdown files set up and rendered. I also really liked how you can define layouts for your markdown pages within the files frontmatter. All you need to do is

```md
---
setup: |
  import Layout from '../../../layouts/BlogPost.astro'
---
```

and your page is wrapped in your layout.

Finally, I really like how Astro handles frontmatter in general. You can write code like this in one of your `.astro` files to grab all your posts.

```astro
---
let allPosts = await Astro.glob('./posts/*.md');
let featuredPosts = allPosts.filter(post => post.frontmatter.isFeatured);
---
```

Because `allPosts` is an array, it's super easy to sort and filter your posts based on whatever contents you have in their frontmatter. I can't even begin to describe how much nicer this is than my setup in Next.

What also impressed me was how fast the Astro version was built and deployed. I mentioned earlier that the Next version took between 30 seconds and a minute to build and deploy. The Astro version takes between 15 to 25 seconds to build and deploy. That's a decent improvement in build time!

The one thing I still have left to set up is my sitemap and `robots.txt`. In the Next version, I was able to set up a simple script that ran whenever I built the application that would recreate the sitemap. I'm not entirely sure how I'm going to set it up here, but I'm sure it will be something very similar.

## Final thoughts

Given my use case on this site, Astro is a better fit than Next.js. While performance-wise they're both very similar, Astro just makes things easier for me. From how it handles markdown to improved build times, Astro really impressed me.

Does Astro replace Next.js? No, not at all. For brockherion.dev, Astro makes more sense because the content is static. It lets me do what I need with less overhead. Next can do static content, but it required a bit more setup to get working correctly. Where Next shines for me is when I'm building a very interactive application or dynamic site. If I have a lot of dynamic or user-driven content, Next handles it with ease. What it comes down to in this case is using the right tool for the job.

Overall, I really like Astro and can't wait to see where it goes. For building static sites, it's a fantastic tool. It was able to provide me with exactly what I needed while providing me with a great developer experience.

Happy coding!
