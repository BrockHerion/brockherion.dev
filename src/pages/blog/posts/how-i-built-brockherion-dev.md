---
setup: |
  import Layout from '../../../layouts/BlogPost.astro'
title: How I built brockherion.dev
subTitle: Taking a look back at where this site came from, where it is now, and where it's going.
slug: how-i-built-brockherion-dev
description: Join me as I share how I built brockherion.dev! We'll look at where it started, where it is now, and plans for the future.
isPublished: true
isFeatured: false
publishedOn: "April 26, 2022"
image: /posts/how-i-built-brockherion-dev.webp
permalink: 'https://brockherion.dev/blog/posts/how-i-built-brockherion-dev'
---

brockherion.dev is finally at a place where I'm happy with it. While there are still bugs to fix and features I want to add, I'm genuinely pleased with how far it's come in the past year. It had been through the ring a few times with different stacks, and to be quite honest, I sometimes thought this would never get done. But it was all those failed iterations and ideas that made this site what it is today.

In this article, we're through my journey of building brockherion.dev. We'll look at some of the tech I tried, why I picked the stack that I did, the features and ideas that made it, and much more.

## Background

To understand where this project began, we have to go back to 2020 when I started blogging. I wanted to blog for a long time and finally decided to do it. I got set up on Medium and began publishing tech articles. The overall feedback was positive, which inspired me to keep writing. I eventually started cross-posting my articles to dev.to.

In early 2021, I decided to get even more serious about creating blog content. I wanted to have everything I wrote under one roof, something I could truly call my own. I also wanted to improve my writing skills as a whole. I picked up a Udemy course on creating and growing a blog. I started learning about how to brainstorm content, the importance of keeping a journal, writing drafts and revisions, and so much more. The skills I learned in this course are things I still use when creating content today.

Feeling confident in myself, I first reached for a WordPress site. I decided to use SiteGround as my hosting provider, as they had a straightforward setup process. I had picked WordPress because it was one of the better options for getting a site set up in terms of complexity and cost. The barrier to entry was small. I spun up a new WordPress site, picked up a domain, and started publishing content!

After this, I started to want to do more with my site in terms of customizations. I had an idea in mind for styling my website, but had never built a WordPress theme before. My experience in software development, at this point, was React and .NET for the most part. Determined to learn it, I installed WordPress locally and started learning how to create themes.

## From WordPress to Ghost to Next

WordPress turned out to be a bit daunting for me. I spent a lot of time learning WordPress and how it works. On top of that, I was also not familiar with PHP. I spent more time learning and figuring out how WordPress worked than building a theme for myself. And because I was only learning this skill for myself with no plans to continue building WordPress sites, I soon found myself looking for alternatives.

You might be asking yourself why I would not just buy a theme. That is a fair and completely valid question. The answer comes down to wanting to use this project as a way to work on my design skills. While I do full-stack development, I work more on back-end logic. I needed brockherion.dev to be a way to practice my front-end skills.

I decided to give Ghost a try after Ali Abdaal talked about it on his YouTube channel. What I liked about Ghost was just how simple it was, compared to WordPress. WordPress can be a little bit overwhelming in terms of content. There's so much you can do through settings and plug-ins. Ghost offers plug-ins, but because Ghost mainly caters blogs, it was much easier for me to set up and configure to my liking. The included themes are pretty good, and building a custom theme is straightforward. Ghost uses Handlebars for templates. To me, this was way more intuitive. I'm more familiar with JavaScript than PHP, so picking up Ghost was easier for me.

I stayed on Ghost for a while, tinkering with themes and writing articles. I liked how Ghost performed as a platform but soon thought about other features I would love to include on my site. Ghost wouldn't be able to do these, at least not easily. I concluded it was time for me to build something from scratch. After considering if I should use Vue and Nuxt or React and Next, I decided on Next because I'm much more comfortable in React than Vue.

On October 30th, 2021, I unveiled the current iteration of brockherion.dev.

## The Current Site

The current site is built on Next.js with TypeScript and hosted on Vercel. For my styling, I went with TailwindCSS and added some custom configuration to it. This combination allowed me to build the site very quickly. The stack here is the same stack I do all of my freelance and side projects in, and it's personally my favorite stack to build projects.

For analytics, I'm using Plausible. Plausible is a fantastic alternative to Google Analytics that has visitor privacy at its forefront. I don't need to see more information other than where my visitors are coming from, what pages they visited, and how long they stayed on each page. Plausible gives me exactly what I need without being intrusive to my visitors. It's also a much smaller bundle than Google Analytics, so my page loading speeds stay fast.

My newsletter is through Revue, and the sign-up form is just the snippet Revue provided to embed sign-ups on the site. I don't want to handle that kind of data myself, so using Revue to manage my newsletter was an easy choice. Not only can I embed the form on my site, but I can also embed it on my Twitter profile. Having this leads to more ways for visitors to engage with my content on multiple platforms.

The blog section has a complicated history. When I first started brockherion.dev I was publishing my content on Hashnode. I wanted a way to share and create while this site was in development and chose Hashnode. My initial thought was to use Hashnode as a headless CMS. At the time of building brockherion.dev, however, it was not 100% there yet. I ended up creating links to my articles instead.

Once brockherion.dev was more fleshed out, I decided to try hosting my content using markdown files. The first challenge was how I should structure and style these pages. I discovered MDX, which let me use React components within my markdown files. MDX made styling my blog pages very easy, as I could use React components directly in my files. The next challenge was more related to SEO things. How do you get nice-looking cards on Twitter, Facebook, and LinkedIn? How do you please the Google algorithm? I learned how to use frontmatter and about creating header tags optimized for SEO. I learned about page rankings, sitemaps, keywords, and descriptions.

With this system in place, I started bringing over some of my Hashnode content to brockherion.dev. Doing this was easy, as Hashnode lets you define a canonical URL to the original content. This way brockherion.dev wouldn't get penalized, as I have the same thing in multiple places.

I intentionally tried to keep this as simple as possible. Having markdown files for my articles gives me flexibility in what I can do with them while using Revue as my newsletter provider means that I don't need to manage users in my database. brockherion.dev is statically generated, so it remains fast and responsive.

## Moving Forward

While I'm happy with how brockherion.dev has turned out thus far, there are a few areas for improvement and some features I want to add. The goal of these serves a few purposes. I want to enhance my web development skills, improve my content pipeline, and improve the user experience.

The first thing to add is a back-end to handle cross-posting my content to Hashnode, Medium, and dev.to without me needing to copy and paste. It's also a fantastic excuse for me to try building an app using Elixir, as I want to learn functional programming. This feature is low on my list of things to do right now as I'm only cross-posting to Hashnode right now. It would still be nice to save a single markdown file and have it post/update on those platforms without me needing to think about it.

The second thing is enhancing the blog listing page. I want to add searching, filtering, and a comments section to each article. I also plan on adding share buttons on each article, so sharing content on social media is simpler. I might add a login system, but that's a thing for later down the line.

Finally, I would like to refactor my code and break things out into more logical components, plus add more animations to the site. My goal here is to work on my React skills and create a more 'alive' site. I also want to rework the structure of a few pages, namely 'projects', 'blog', and 'about'. I want them to be friendlier and nicer looking. I also need to dig into SEO a little more and tweak some of the content in my page headers to help me get up in the rankings.

## Conclusion

brockherion.dev has seen a few iterations in its existence, but it's now in a good position for me to continue building and growing it. The tech is a joy to work with and lets me create the site in a way that works for me. My goal now is to continue improving the experience for you and keep pushing my web development skills further. This project has been a blast to work on and has taught me a lot.

I hope your visit here was a pleasant experience. I'm always happy to accept feedback and suggestions on things. You can always reach out to me on Twitter [@brockherion](https://twitter.com/brockherion) or email me at [brock@brockherion.dev](mailto:brock@brockherion.dev). If you want to view the source code, you can find it on [GitHub](https://github.com/BrockHerion/brockherion.com)

Thank you much for reading and I'll see you in the next one. Happy Coding!
