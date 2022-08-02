---
layout: "../../../layouts/BlogPost.astro"
title: Is your website climate-friendly?
subTitle: Here's how I reduced the carbon footprint of brockherion.dev and how you reduce the footprint of your site as well.
slug: is-your-website-climate-friendly
description: Here's how I reduced the carbon footprint of brockherion.dev and how you reduce the footprint of your site as well.
isPublished: true
isFeatured: true
publishedOn: "July 2, 2022"
image: /posts/is-your-website-climate-friendly.webp
permalink: 'https://brockherion.dev/blog/posts/is-your-website-climate-friendly'
---

Did you know that websites have carbon footprints? It makes sense if you think about it. Every time you visit a site, you are making a request to a server for data. Each server takes some amount of energy to send that content back to you. Thus, every time you visit a website, a small amount of carbon dioxide is created. This may not seem like a huge deal, but think about how many people visit any number of websites daily.

This wasn't something I was aware of until I was reading about how Plausible, my analytics provider, differs from other tools. One of the things that caught my attention was a section called 'How much electricity does my website consume'. It provided a link to [Website Carbon Calculator](https://www.websitecarbon.com/) that calculates your site's CO2 emissions per visitor visit. Out of sheer curiosity, I took a look at it.

## Testing the CO2 emissions for the Next.js version of brockherion.dev

I first tested the Next.js version of brockherion.dev. I had no idea what to expect from it. I knew going in my site was fast and scored pretty well on Lighthouse. I thought brockherion.dev's carbon footprint wouldn't be too bad.

The results were not what I was expecting. Each visitor to the Next.js version of brockherion.dev would generate about 0.69g of CO2 per visit. This is dirtier than 64% of the sites tested on Website Carbon Calculator!

As somebody who is environmentally conscious, this didn't sit well with me. For a site that serves static content, I was shocked that brockherion.dev did so poorly on this. I started thinking about ways I could reduce my carbon footprint.

## Testing again with the Astro version of brockherion.dev

Recently, I moved brockherion.dev from Next.js to Astro. Overall, my experience with Astro was a positive one. It solved some of the issues I had with Next.js and building static sites in it.

I reran the Website Carbon Calculator, this time with the Astro version. Once again, the results really surprised me. The Astro version of brockherion.dev generates about 0.07g of CO2 per visit, about a 90% decrease in emissions. This version is cleaner than 94% of the sites tested. That's an insane improvement!

It would be an understatement for me to say I was thrilled with these results. But I began to wonder why this was the case. If you read my article on how [I rebuilt brockherion.dev in Astro](https://www.brockherion.dev/blog/posts/i-rebuilt-my-site-in-astro), I talk about how it was a mostly 1-1 port. This is because the content remained the same, but the layout was tweaked somewhat. Some of the other things I did revolve around optimizing images. These small tweaks were mainly done to help maximize the Astro version's performance.

I started thinking about why the Astro version produced so much less CO2 than the Next version. While the tweaks I made to images surely helped, both sites were relatively the same structure-wise and hosted on Vercel. I thought that maybe Vercel was not the cleanest provider, but the results from the Astro version showed that this isn't the case.

What I believe it comes down to is how Astro actually builds the site. You see, Astro removes unnecessary JavaScript from the page and only hydrates components when needed. This is done through a process they call partial hydration, which you can read more about in the [Astro Docs](https://docs.astro.build/en/core-concepts/partial-hydration/). Essentially, all unnecessary JavaScript is removed from the page at build time.

So what the improvement in carbon emissions comes down to is bundle size. Next bundles are a lot larger than Astro. It takes more energy to load the Next.js version, which leads to an increase in CO2 emissions per visitor.

## Final thoughts

Climate change is one of the greatest crises humanity has ever faced. Whether we realize it or not, we all play a part in helping combat it. I know sometimes our actions feel very small, but they can have a tremendous impact.

It can hard to know where and how you can make a difference. I recycle everything I can, turn off lights when not in use, and don't drive unless I need to. These are all little things I can do to help reduce my carbon footprint. And I now have another way I can cut my footprint down further through my work. Developers are in a unique position where we can create anything out of nothing. With a computer, we can have an incredible impact on those around us. Why not have a positive impact on the environment as well?

To get started making your site more climate-friendly, head over to the [Website Carbon Calculator](https://www.websitecarbon.com/). There, you can test your site and get suggestions on how you can reduce your site's carbon footprint.

Happy coding!
