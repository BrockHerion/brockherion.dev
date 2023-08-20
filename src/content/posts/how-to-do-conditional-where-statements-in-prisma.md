---
title: How to do conditional 'where' statements in Prisma
description: How to add conditionally add 'where' statements to your Prisma queries
keywords: "prisma, typescript, prisma conditional where, prisma query, orm"
isPublished: true
publishedOn: "August 20, 2023"
---

Prisma offers a few powerful, yet flexible operators for creating your `where` clauses. `AND` and `OR` are perfect when you need to chain conditions together, but don't work as well when you may or may not need a condition at all.

In this article, we'll take a look at how you can add conditional `where` statements to your Prisma queries.

## The problem

I've been working with more complex `where` conditions in Prisma lately, and heavily leveraging `AND` and `OR` to build my statements. The problem I ran into was that I need only wanted to apply a condition if another field existed. In may case, this is was a filter field that could be an array of strings, or undefined. Not only that, this field could have a value, or could be `null`.

Using an `OR` operator here doesn't work. Let's say I have 20 records in my database, and five of them have `null` as their value for this field. Let's say I have the following query below.

```ts
const filters = ['some', 'string', 'filters']; // Could also be undefined

const records = await prisma.myTable.findMany({
  where: {
    OR: [
      {
        value: {
          in: filters
        }
      },
      {
          value: null
      }
    ]
  }
});
```

For the case when `filters` is `undefined`, this works fine. `undefined` in Prisma means "do nothing", so this case we'll get all 15 records with a value back. Then, we'll fetch the other five where their value is `null`. But when we have filters, we'll get all the records that match what's in the filters, plus all where the value is `null`.

Removing the `null` case in the `OR` doesn't work either, as this case will only fetch the 15 records that have a value and ignore the ones where their value is `null`. 

What we want to have happen here is fetch all the records if we have no filters, otherwise only select those that meet the filter criteria and have a value.

So, how do we fix this?

## Using dynamic 'where' statements

The solution here is conditionally add our `where` statement to our query. We can take advantage of the spread operator and conditional statements to do this.

If we re-write our query to add a dynamic `where`, it looks like this

```ts
const filters = ['some', 'string', 'filters']; // Could also be undefined

const records = await prisma.myTable.findMany({
  where: {
    ...(filters 
      ? {
          AND: [
            {
              value: {
                in: filters
              }
            }, 
            {
              NOT: { value: null }
            }
          ]
        }
      : {})
  }
});
```

Here, we're using a conditional statement to determine whether or not we should add the a the `where` clause. Then, we're using the `AND` operator to only get values that in our `filters` array and are not `null`. If we don't have any filters, then we don't add any conditions.

## Wrap up

In this article, we looked at how we can create dynamic `where` clauses in Prisma. Using some normal JavaScript features and Prisma's existing clauses, we can decided when we want to add our `where` conditions to our queries.

## Resources

- [Filtering and Sorting Prisma docs](https://www.prisma.io/docs/concepts/components/prisma-client/filtering-and-sorting#filter-conditions-and-operators)
- [Spread syntax](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax)
- [Conditional (ternary) operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Conditional_Operator)
