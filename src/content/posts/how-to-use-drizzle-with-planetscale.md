---
title: "How to use Drizzle with Planetscale"
description: "Here's how to use Drizzle ORM with a Planetscale database"
isPublished: true
isFeatured: true
publishedOn: "September 30, 2023"
---

If you haven't heard, Drizzle is the new kid on the block in the world of TypeScript ORMs. And it's pretty okay.

Jokes aside, Drizzle is a fantastic ORM that packs a lot of powerful features. Combine that with Planetscale and you've got yourself a next-level developer experience.

In this article, we'll be talking a look at how to get started using Drizzle with your Planetscale database.

## Getting your Planetscale connection string

The first thing we need to do it get our connection string from Planetscale. After logging in and either creating or navigating to your database, find the 'Connect' button on the dashboard.

Once you click that, you'll be greeted with a window where you can get your connection string. Make sure you've setup a branch for production and a second branch to use for schema updates.

Note: If you're password isn't visible, you'll need to create a new password. Just click the 'New password' button and you're good to go!

![Planetscale connection modal](/posts/content/planetscale-connection.png)

From here, you can either select 'Prisma' from the 'Connect with' options, and copy the `DATABASE_URL`, or select 'General' and get your `DATABASE`, `HOST`, `USERNAME`, and `PASSWORD` fields. Either will work with Drizzle, but in this tutorial we're going to be using a single `DATABASE_URL` to connect to our database. Whichever you choose, paste them into your `.env` file.

When using `DATABASE_URL`, you'll need to make a slight tweak to your connection string. You'll need to remove the `sslaccept=string` line at the end of your string and replace it with `ssl={"rejectUnauthorized":true}`

We're now ready to install Drizzle.

## Installing Drizzle and the Planetscale MySQL driver

One of Drizzle's superpowers is that it works with Planetscale's `database-js` driver, which lets you access your Planetscale database from serverfull and serverless environments. Run the following command to install Drizzle and `database-js`

```bash
npm i drizzle-orm @planetscale/database
```

We also want to install Drizzle Kit, a CLI for working with Drizzle. We can install it using the following command

```bash
npm i -D drizzle-kit
```

## Setting up Drizzle and Planetscale

The next thing we want to do is create a new file in our root directory called `drizzle.config.ts`. Add the following code to it

```ts
import type { Config } from "drizzle-kit";
import "dotenv/config";

export default {
  schema: "./drizzle/schema.ts",
  dbCredentials: {
    connectionString: process.env.DATABASE_URL as string,
  },
  driver: "mysql2",
} satisfies Config;
```

This tells Drizzle Kit where our schema file is, our connection string, and what driver we want to use. Because Planetscale is MySQL, we want to use `mysql2` as our database driver for Drizzle Kit.

Next, let's create our `drizzle` folder and add a `schema.ts` file to it. In your schema file, go ahead and create whatever tables you need. For this guide, we'll just create a simple `todo` table.

```ts
// drizzle/schema.ts
import {
  mysqlTable,
  serial,
  timestamp,
  boolean,
  varchar,
} from "drizzle-orm/mysql-core";

export const todos = mysqlTable("todo", {
  id: serial("id"),
  description: varchar("description", { length: 256 }),
  completed: boolean("completed").default(false),
  addedAt: timestamp("added_at").defaultNow()
});

```

Next, within our `drizzle` folder, add a new file called `index.ts` and add the following code to it

```ts
import { drizzle } from "drizzle-orm/planetscale-serverless";
import { connect } from "@planetscale/database";
import "dotenv/config";

const connection = connect({
  url: process.env.DATABASE_URL,
});

const db = drizzle(connection);

export { db };
```

Here, we're configuring a connection to use in our application. We can now import `db` anywhere we need to in our application and run queries on it.

## Updating your database with Drizzle Kit

We can now apply our schema to our database, and we don't need to generate any migrations to do so. Combing Planetscale's branch system and Drizzle Kit's `push` command, we can create a workflow that allows for safe and consistent database updates without the headache of managing migrations.

Let's add the following command to our `package.json` file

```json
{
  "scripts": {
    "db:push": "drizzle-kit push:mysql --config=drizzle.config.ts"
  }
}
```

Run the command, and you're table(s) should be created. You should now be able to see your tables in your branch and query them in your application.

## Wrap up

In this guide, we looked at how to setup Drizzle to work with Planetscale. Drizzle is an incredibly powerful ORM that when combined with Planetscale, gives you a truly one-of-a-kind developer experience.

Happy coding!

## Resources

- [Connect any application to PlanetScale](https://planetscale.com/docs/tutorials/connect-any-application)
- [PlanetScale (Connecting from Drizzle)](https://orm.drizzle.team/docs/quick-mysql/planetscale)
- [SQL schema declaration](https://orm.drizzle.team/docs/sql-schema-declaration)
- [Branching (in Planetscale)](https://planetscale.com/docs/concepts/branching)
