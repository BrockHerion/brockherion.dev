---
title: "Using React Hook Form with Next.js 13 Server Actions"
description: "Here's how to use Drizzle ORM with a Planetscale database"
isPublished: true
isFeatured: true
publishedOn: "October 8, 2023"
---

Next.js 13 introduced us to Server Actions. Instead of having to create a new API endpoint, you can just define an asynchronous function that can be called from your components. This means we can leverage libraries like React Hook Form to manage our form state on the client, and use a Server Action to handle submissions.

In this article, we'll be looking at how we can build our forms using React Hook Form and submit them using Server Actions.

## Enabling Server Actions

At the time of writing this, Server Actions are still experimental in Next.js. This means we explicitly need to enable them in our app.

In your terminal, create a new Next.js application by running the following command

```bash
npx create-next-app@latest
```

Answer the prompts, making sure you select 'Yes' when asked if you want to use the App directory.

Once your project is created, open your `next.config.js` file. To enable Server Actions, add the following code to your config file

```js
/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true
  }
}

module.exports = nextConfig
```

## Creating our form

With Next.js all setup, we can go ahead and create our form. In your terminal, run the following command to install React Hook Form.

```bash
npm i react-hook-form zod @hookform/resolvers
```

You'll notice we're also installing Zod. Zod is a schema declaration and validation library. We'll be using it to validate our form data.

In our 'app' folder, add a new client component for our form

```tsx
// app/my-form.tsx

"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

export const myFormSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  email: z.string().email()
});

export type MyFormFields = z.infer<typeof myFormSchema>;

export default function MyForm() {
  const form = useForm<MyFormFields>({
    resolver: zodResolver(myFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
    },
  });


  return (
    <form>
      <div>
        <label>First name</label>
        <input {...form.register("firstName")}>
      </div>
      <div>
        <label>Last name</label>
        <input {...form.register("lastName")}>
      </div>
      <div>      
        <label>Email</label>
        <input {...form.register("email")}>
      </div>
    </form>
  )
}
```

## Implementing our Server Action

Still in our 'app' folder, let's create a new file called `actions.ts`. This file will contain our Server Actions.

```ts
// app/actions.ts

"use server";

import { MyFormFields } from './my-form';

export function handleMyFormSubmit(data: MyFormFields) {
  console.log({ firstName: data.firstName, lastName: data.lastName, email: data.email });
}
```

For simplicity we're just logging our form values out. Normally, this is where you want to do something like save to your database or call another API.

With that in place, let's create put it all together and add our form submission.

## Handling form submission

Back in `my-form.tsx`, let's add a new function to our form component called `onMyFormSubmit`

```tsx
// app/my-form.tsx

// imports
import { handleMyFormSubmit } from "./actions";

export default function MyForm() {
  // hooks

  const onMyFormSubmit = async (data: MyFormFields) => {
    await handleMyFormSubmit(data);
  }

  return (
    <form onSubmit={form.handleSubmit((data) => onMyFormSubmit(data))}>
      {/* omitted */}
    </form>
  )
}
```

With that in place, you are now able to manage your forms using React Hook Form, validate your inputs with Zod, and submit using a Server Action!

## Wrap up

Today we looked at how to use Next.js Server Actions with React Hook Form. We're using React Hook Form to manage our form state on the client and Zod to validate our inputs. We then use a Server Action to handle our submission, removing the need to create and call an API endpoint.

Happy coding!

## Resources

- [Forms and Mutations (Next.js)](https://nextjs.org/docs/app/building-your-application/data-fetching/forms-and-mutations)
- [React Hook Form](https://react-hook-form.com/)
- [Zod](https://zod.dev/?id=introduction)
