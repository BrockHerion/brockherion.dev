---
title: Dynamic 'where' statements in Drizzle
description: How to crete dynamic 'where' statements in Drizzle ORM
keywords: "drizzle, typescript, node"
isPublished: true
publishedOn: "July 17, 2024"
---

Drizzle has quickly become my go-to ORM for Node.js applications. It offers a lot of flexibility and functionality while providing a great developer experience.

Recently, while working on [Queuebase](https://queuebase.com), I had a need for being able to append where clauses dynamically to my queries. Thankfully, because Drizzle is just TypeScript, this was a really simple thing to implement. Today, I'll be showing you how to create dynamic `where` statements in Drizzle.

## The Problem

Let's say we have a product model in our database, and we want to fetch all products that have a price greater than 100. This is simple enough to do with a `where` clause.

```ts
const products = await db
  .select()
  .from(product)
  .where(gte(product.price, 100));
```

Now let's say we want to fetch all products that have a price greater than 100, but only if they have a category of "electronics". This is also simple to do, we just need to add a `and` call to our query.

```ts
const products = await db
  .select()
  .from(product)
  .where(and(
    gte(product.price, 100), 
    eq(product.category, 'electronics')
));
```

This works, but it's a bit verbose. This query assumes that we always want to filter by price and category. If we want to add more filters, we'll need to add more `and` calls. And what if these filters are optional? We may not always want to filter by category, or have a start and stop price range.

## Dynamically appending 'where' conditions

The solution here is to create an array of conditions. Then, we can pass our array to the `where` clause.

```ts
function getProducts(filters?: ProductFilters) {
  // Placeholder condition incase we don't have any filters
  const where = [eq(1, 1)];

  if (filters?.category) {
    where.push(eq(product.category, filters.category));
  }

  if (filters?.priceRange?.start) {
    where.push(gte(product.price, filters.priceRange.start));
  }

  if (filters?.priceRange?.stop) {
    where.push(lte(product.price, filters.priceRange.stop));
  }

  const products = await db
    .select()
    .from(product)
    .where(and(...where));
}
```

Now, if we have no filters, we'll get all products. If we have a category filter, we'll get all products where the category matches. If we have a price range filter, we'll get all products where the price is between the start and stop values. With this setup, we are now able to dynamically build our `where` clause and expand on it in the future if needed.

## Resources

- [Drizzle ORM](https://orm.drizzle.team/)
- [SQL Select - Drizzle](https://orm.drizzle.team/docs/select)
- [Filter and conditional operators - Drizzle](https://orm.drizzle.team/docs/operators)
- [Dynamic query building - Drizzle](https://orm.drizzle.team/docs/dynamic-query-building)
