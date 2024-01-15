---
title: "Creating extendable Zod schemas with refine"
description: "In this article, we’ll look at how you can create expandable Zod schemas that also apply custom refinements"
keywords: "zod, javascript, typescript, node"
isPublished: true
isFeatured: true
publishedOn: "January 17, 2024"
---

I was working on a project recently where I was using Zod to validate my schemas. In one schema I had, for password validation, I found I was repeating it in a few different places. I decided to take to try and extract this schema to a shared location.

I didn’t need to just create a shared schema, but an expandable one as well. Some schemas also had properties that always weren’t needed in every area. Each schema was also using custom validation logic via `refine`, so that had to be taken into account as well.

In this article, we’ll look at how you can create expandable Zod schemas that also apply custom refinements.

## The issue with 'extend()'

The simplest answer here would be to create the base schema and use Zod’s `extend` method to build on top of it. This is what I tried originally, but it didn’t work exactly as I’d hoped.

Let’s say I have the following schema for password validation

```tsx
export const passwordValidationSchema = z.object({
  password: z.string(),
  confirmPassword: z.string(),
});
```

I could then build another schema on it using `extend`

```tsx
export const userRegisterSchema = passwordValidationSchema.extend({
  username: z.string(),
  email: z.string().email(),
  // etc
});
```

This works great, until I want to add a refinement to `passwordValidationSchema`

```tsx
export const passwordValidationSchema = z.object({
  password: z.string(),
  confirmPassword: z.string(),
}).refine(
  (data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
});
```

The `userRegisterSchema` now breaks. This is because `transform` and `refine` are considered effects, not objects. The result we get back from `extend` is `ZodObject<T>`, while the result from `refine` is `ZodEffect<ZodObject<T>>`. Zod validates types first, then passes it through any refinements/transformations.

This means once an object has been refined/transformed, we can no longer extend it.

## Extending a refined schema

Luckily, there is a simple solution for this. We can create a helper function that accepts any Zod schema and use `expand`. After that, we can then `refine` and return the resulting schema.

```tsx
export const passwordValidationSchema = z.object({
  password: z.string(),
  confirmPassword: z.string(),
});

export function refinePasswordValidationSchema(schema: ZodRawShape) {
  return passwordValidationSchema
    .extend(schema)
    .refine((data) => data.password === data.confirmPassword, {
      message: "Passwords do not match",
      path: ["confirmPassword"],
    });
}
```

With this, we are now able to expand our original schema and apply a refinement to it.

## Resouces

- [.extend after .refine](https://github.com/colinhacks/zod/issues/454)
- [Zod](https://zod.dev/)
