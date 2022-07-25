---
setup: |
  import Layout from '../../../layouts/BlogPost.astro'
title: 'Fixing issues and finding new ones - Chirpmark Devlog #3'
subTitle: This week, I spent time fixing bugs that came up during initial user testing and cleaning up some areas of code.
slug: fixing-issues-and-finding-new-ones
description: This week, I spent time fixing bugs that came up during initial user testing and cleaning up some areas of code.
isPublished: true
isFeatured: false
publishedOn: "July 25, 2022"
image: /posts/fixing-issues-and-finding-new-ones.webp
permalink: 'https://brockherion.dev/blog/posts/fixing-issues-and-finding-new-ones'
---

Hello everyone and welcome to another Chirpmark Devlog! This week I spent time working on implementing the feedback I received. A lot of the feedback for Chirpmark in its current state revolved around the ‘My bookmarks’ page, which is currently useless. All it does is display every bookmark you’ve imported and nothing else.

I also spent time working on various other issues that have cropped up, namely bookmark import. This area had to be refactored once already, which had already slowed the process down. With the changes I made to ‘My bookmarks’, this function is even slower than it was before.

## Making ‘My bookmarks’ more useful

The core of Chirpmark centers around bookmarks and collections. It’s the basic concept that the rest of the app is built off of. Collections contain a lot of useful features, including search, filtering by tag, and the ability to view your bookmarks in a list or grid format. And that’s saying nothing of some of the other features being worked on.

‘My bookmarks’ was not following any of that. The page itself was simply an API call to get all of a user's bookmarks. This works fine, except that all of the features that exist for collections would need to be implemented again here. Instead of doing that, however, I decided to simply turn ‘My bookmarks’ into a collection.

This has a few advantages. First, I can start using all the features I have on collections for all bookmarks now. I now have access to searching and filtering, as well as any collection settings that exist.

Having ‘My bookmarks’ be a collection also means I can simplify my API calls. Before I had special logic to check if an action was being performed on a collection or not. Now, I know that any bookmark action will relate to a collection and can remove a lot of that logic.

Finally, this approach is so much easier to build on. If I need to add new settings, add more filters, or tweak how something works, I can now make one change and have it apply everywhere. No more having to duplicate code or create generic React components with a million props because the logic between the two systems was different. Overall, these changes made my life much easier and simplified most of my code.

## The issues with import

While most of these changes are positive, there is one thorn in my side that I haven’t quite figured out how to deal with yet. Bookmark import has been really tricky to get right and it gets more complicated with each change I make. The change to make all bookmarks a collection created a new set of issues while making an existing one worse.

When import was first built, it simply made a call to Twitter’s API to get a users bookmarks, inserted any new ones while fetching existing ones, and then returned them to the user. There wasn’t anything fancy and this operation was pretty quick. This process had to change when I introduced the idea of posts into the system.

A post is really just an entity that contains external information about a bookmark. For example, a Tweet’s ID is stored in a post. Posts are crucial for some of the features I have planned for later on. They did, however, complicate the system for importing bookmarks.

Instead of now just creating or fetching bookmarks, I need to create or fetch posts first. After I have every post, I can then create new bookmarks. This turned out to be a not-so-great thing performance-wise. It drastically slowed down the operation and generated a ton of, in my opinion, unnecessary SQL.

I’m using Prisma as my ORM and it doesn’t support ‘fetch or create’ on a table. The alternative solution is to use their `upsert` command, which will then either create a new record or simply fetch an existing one. You can do this if you give it an empty object for the update parameter. This generates a `SELECT` query for every single item in my list. For my Twitter account, that’s roughly 80 selects generated every single time I want to import.

With the latest changes to make it a collection, this gets worse. Before, I was just doing a `createMany`,  which will do exactly what the name implies. It’s very fast and works pretty well. Now however, I need to fetch the ‘all’ collection first so I can link the bookmarks to it. The problem is `createMany` does not let you connect objects. This means I’m falling back on `create` or `upsert` to make sure my entities are linked correctly, which means another insane number of queries generated.

There are a couple of things I’m trying to do to optimize this. First, I’m filtering out any posts that don’t exist already to create them. Because I’m now fetching existing posts in bulk and then creating new ones, I’m reducing the number of queries that are created. For adding bookmarks to the collection, it's a bit harder to do because of the `createMany` limitation I mentioned earlier. The fix will be very similar to posts, where I’ll fetch existing bookmarks first in a single query, then create any new ones.

There’s also a bug where not every bookmark you have on Twitter is brought over to Chirpmark. It seems to only bring in some. I’m still investigating this issue, as I haven’t been able to reproduce it myself, but multiple people have reported it to me. This could be simply an issue with Twitter’s API however. What I’m planning on doing here is adding more logging around this area and seeing what’s actually going on.

## Wrap up

While this week has presented some interesting technical challenges, it still feels good to be making progress on Chirpmark. The feedback I’ve gotten thus far has helped point me in the right direction and helped me uncover things within the app I hadn’t noticed before. Progress is a little slower than I would like it to be, however.

This week, my goal is to continue fixing these issues and improving the usability of the app. With these issues addressed, I can start adding some of the other features I planned to bring in for the initial launch. Overall, I’m happy with how Chirpmark is progressing and I’m excited to start getting more features out soon!
