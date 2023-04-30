---
layout: "../../../layouts/BlogPost.astro"
title: "Why I'm using NanoIDs for my database keys"
slug: why-im-using-nanoids-for-my-database-keys
description: "Here's why I'm using NanoIDs for unique keys in my database models."
keywords: "typescript, nanoid, primary key, prisma, database"
isPublished: true
isFeatured: false
publishedOn: "April 29, 2023"
image: /posts/why-im-using-nanoids-for-my-database-keys.webp
permalink: "https://brockherion.dev/blog/posts/why-im-using-nanoids-for-my-database-keys"
---

If you're like me, you have a feeling of existential dread whenever you're deciding what to choose as a primary key for your database tables. Should you pick the tried-and-true int or go with the scalable UUID? Or maybe something like a CUID or NanoId would be a better fit for you. With all these options to choose from, picking a PK can be overwhelming.

I stumbled across an article from the PlanetScale team on why they use NanoIDs for their unique identifier in their APIs. And if anybody knows what they're doing with database keys, it's the team over at PlanetScale.

In this article, we'll talk about PlanetScale's approach to unique identifiers, why I went with it, and how I implement it in Prisma for my NextJS projects.

## My normal approach for primary keys

Integers one of the most used types for primary keys. They're simple to work with and don't take up a lot of space. For most projects, they work perfectly fine.

That being said, they do present some issues. One major one is that if you're trying to merge data from two databases, you may end up with primary key conflicts. You could regenerate the data, but you could end up with key-issues on your client. Another issue is a security concern where if you have, say, an ID of 69, you can reason that there is a record with an ID of 68 and potentially one with an ID of 70. Changing that ID in a request to your API could fetch data that you're not supposed to have access to.

This gives a strong argument for using UUIDs. UUID stands for universally unique identifier and solves the mains issues with integers. Because of how they're generated, it's very easy to merge and move data between databases without the risk of conflicts. They're also not sequential, meaning that you can't guess other IDs based on a single value you have.

UUIDs do have a major downside though: their size. UUIDs are 128 bits long, which are twice the size of using `BigInt` and four times the size of using a normal `Int`. If storage space is a concern, UUIDs may be a bad choice. They're also less readable than integers are, which can make reasoning with them harder.

In my projects, I tend to use integers simply because the projects I work aren't particularly complex with their database setups. I do, however, try to avoid exposing my integer IDs in my URLs and rely on unique slugs instead. This was working great, until it got really cumbersome to maintain. I started researching different approaches for primary keys and eventually found the PlanetScale article, where they explained their approach when building their schema for their API.

## The PlanetScale approach

How the team at PlanetScale went about this was using a `BigInt` as their primary key and adding a second unique column to their tables called `public_id`. This column was added to any model that was going to be exposed to a client. To populate this column, they're using NanoIDs. There are a few reasons they chose NanoID for this task, which they outline in their blog post.

This is a best-of-both-worlds approach that give the advantages of integers and the uniqueness of UUIDs, without the cons of either. NanoIDs are super customizable, letting you set what length you want and what characters you want included, all while being collision resistant. And using integers as the primary key gives you all the space and performance you would expect with them, without the risk of collisions or security exploits.

## Why I'm using it

Like I said before, I'm already using integers in most of my applications. And while my use case is different from PlanetScale's, this approach provides a few advantages.

First, some of my applications are multi-tenant and I'm storing my tenant data in local storage. This makes making API requests a lot easier, as I can just grab the tenants ID from local storage. However, anything you send to the client can be accessed by your user, and storing an integer here makes me nervous. Adding the `public_id` here provides an extra layer of security, as it prevents bad actors from trying to change that value and getting at other tenants data.

The other thing this lets me is use this field in external systems. For example, I've been using [Clerk](https://clerk.com/) for auth and it's been a great experience. One of the things I can do is use the `public_id` as a meta field on my Clerk user. With my multi-tenant apps, it would look something like `tenant_id: 5ais23v82avs`. This makes working and integrating with external systems far easier, and am still hiding my system internals.

## Prisma implementation

PlanetScale uses Ruby on Rails and Go for their systems, while I tend to use TypeScript and Prisma. Luckily, there's a Node package for NanoID that's really simple to use. You can install it with

```bash
pnpm add nanoid
```

Once that's installed, you can go into your `schema.prisma` file and add your column

```prisma
model User {
  id        BigInt   @id @default(autoincrement())
  publicId  String   @unique @map("public_id") @db.VarChar(12) // Make this as long as you want
  // Your other fields
}
```

Unfortunately, Prisma does not provide it's own generator for creating NanoIDs. We can instead setup some utility methods to help us with NanoID creation.

```ts
// utils/public-id.ts
import { customAlphabet } from "nanoid";

const alphabet = "0123456789abcdefghijklmnopqrstuvwxyz";
const length = 12;

const nanoid = customAlphabet(alphabet, length);

export function generatePublicId() {
  return nanoid();
}
```

And then when we create our models, we can use it like so

```ts
// services/user-service
import { PrismaClient } from "@prisma/client";
import { generatePublicId } from "~/utils/public-id";

const prisma = new PrismaClient();

type UserInfo = {
  firstName: string;
  lastName: string;
  email: string;
}

export async function createUser(userInfo: UserInfo) {
  const newUser = await prisma.user.create({
    data: {
      publicId: generatePublicId(),
      ...userInfo
    }
  });

  return newUser;
}
```

If you're using another ORM, like Drizzle, this approach works here as well. Having this helper function here makes it really easy to generate values in our code and not be tied to a specific ORM. Now an argument could be made it would be better if this was auto-generated elsewhere, but that's outside the scope of this article.

Now the other thing we can do here is return our `public_id` in place of our `id` field when we return data.

```ts
// services/user-service.ts

export async function getUser(userId: string) {
  const user = await prisma.user.findUnique({
    where: {
      publicId: userId,
    },
    select: {
      publicId: true,
      // Other field selections
    }
  });

  if (!user) {
    throw new Error("User was not found!");
  }

  return {
    id: user.publicId,
    ...user
  };
}
```

## Wrap up

When I'm building applications, I try to keep things as simple and flexible as I possibly can while creating a scalable and robust system. This approach to primary keys lets me do just that.

## Resources

- [Why we chose NanoIDs for PlanetScale’s API](https://planetscale.com/blog/why-we-chose-nanoids-for-planetscales-api)
- [NanoID](https://github.com/ai/nanoid)
- [Prisma](https://www.prisma.io/)
