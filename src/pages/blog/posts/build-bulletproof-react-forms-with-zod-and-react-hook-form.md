---
layout: "../../../layouts/BlogPost.astro"
title: "Build bulletproof React forms with Zod and React Hook Form"
description: "Using Zod and React Hook Form, you can build robust React forms with ease."
keywords: "react, typescript, javascript, zod, react hook form"
slug: build-bulletproof-react-forms-with-zod-and-react-hook-form
isPublished: true
isFeatured: true
publishedOn: "March 8, 2023"
image: /posts/build-forms-with-zod-and-react-hook-form.webp
permalink: "https://brockherion.dev/blog/posts/build-bulletproof-react-forms-with-zod-and-react-hook-form"
---

If you've ever built a form in React before, you know how painful it can be. Trying to manage every part of a form on your own can be tedious. You have to deal with input changes, errors, validation, and so much more. This is where Zod and React Hook Form come into the picture. Using these two libraries in combination lets you build forms without all the pain. In this article, we'll look at what Zod and React Hook Form do and how to use them together.

## What is Zod?

Zod is a TypeScript-first schema creation and validation library. A schema can be anything from a simple string to complicated object. It lets you define how your data should look and behave. From Zod's documentation,

> Zod is designed to be as developer-friendly as possible. The goal is to eliminate duplicative type declarations. With Zod, you declare a validator once and Zod will automatically infer the static TypeScript type. It's easy to compose simpler types into complex data structures.

Zod can be installed with

```bash
npm install zod
```

In practice, Zod is used like so

```ts
import { z } from 'zod';

// Creating a schema
const Person = z.object({
  firstName: z.string(),
  lastName: z.string(),
});

// Parsing data
Person.parse({ 
  firstName: 'Brock', 
  lastName: 'Herion',
}); // => { firstName: 'Brock', lastName: 'Herion' }

Person.parse('Just a normal string') // ZodError

// Infering a type
type Person = z.infer<typeof Person>;
```

In the following sections, we'll see how we can apply this to our React forms.

## What is React Hook Form?

React Hook Form is a lightweight form library that makes building and managing React forms so much simpler. It provides built-in validation, field change management, and so much more.

React Hook Form can be added to your project with

```bash
npm install react-hook-form
```

Using React Hook form in your application is very straightforward

```tsx
import { useForm , SubmitHandler} from 'react-hook-form';

type FieldValues = {
  firstName: string;
  lastName: string
}

export default function MyForm() {
  const { register, handleSubmit } = useForm<FieldValues>();

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    // Do your form submission stuff here
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor='firstName'>First name</label>
      <input id='firstName' {...register('firstName')}>
      <label htmlFor='firstName'>Last name</label>
      <input id='lastName' {...register('lastName')}>
    </form>
  );
}

```

## Using Zod and React Hook Form together

While React Hook Form does have input validation, we can use Zod to define our input schema and have a finer degree of field validation. And luckily for us, React Hook Form supports Zod schemas, via a resolver.

To get started, we need to add the resolvers package to our project

```bash
npm install @hookform/resovlers
```

Next, let's create a Zod schema for our form

```ts
import { z } from 'zod';

const FieldValuesSchema = z.object({
  // firstName is required and has a max length
  firstName: z.string().min(1, { message: 'First name is required' }).max(50),
  // lastName is optional, but has a max length
  lastName: z.string().max(50).nullish(),
  age: z.number()
});

type FieldValues = z.infer<typeof FieldValuesSchema>;
```

Now we can setup our form to use the Zod resolver and our schema

```tsx
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

// Zod schema defined here...

export default function MyForm() {
  const {     
    register,
    handleSubmit,
    formState: { errors }, 
  } = useForm<FieldValues>({ 
    resolver: zodResolver(FieldValuesSchema),
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    // Do your form submission stuff here
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* First name */}
      <label htmlFor='firstName'>First name</label>
      <input id='firstName' {...register('firstName')} />
      {errors.firstName?.message && <p>{errors.firstName?.message}</p>}
      {/* Last name */}
      <label htmlFor='firstName'>Last name</label>
      <input id='lastName' {...register('lastName')} />
      {/* Age */}
      <label htmlFor='age'>Age</label>
      <input id='age' {...register('lastName', { valueAsNumber: true })} />

      <button type="submit">Submit</button>
    </form>
  );
}
```

Our form is now set up and using Zod as a resolver. If you run this code and try to submit without a first name being populated, you'll see "First name is required" error message.

We could add other validation to our fields as well. For example, if we have an email field, Zod provides validation specifically for that. Or for the age field, we could add a range that the age must be between or make sure it's positive or even check if it's a multiple of something.

## Bonus: Using a custom Zod form hook

We can greatly simplify the setup above using a custom hook. Our hook will take most of the default parameters for `useForm` and do all the Zod resolver setup for us.

```ts
// useZodForm.ts

import { zodResolver } from '@hookform/resolvers/zod';
import { UseFormProps, useForm } from 'react-hook-form';
import { z } from 'zod';

export default function useZodForm<TSchema extends z.ZodType>(
  props: Omit<UseFormProps<TSchema['_input']>, 'resolver'> & {
    schema: TSchema;
  }
) {
  const form = useForm<TSchema['_input']>({
    ...props,
    resolver: zodResolver(props.schema, undefined),
  });

  return form;
}
```

Notice what our `props` type is. We're removing `resolver` from the default React Hook Form props and adding a new field called `schema`. We can pass our Zod schema right into the hook and still do things like set our default form values.

Let's refactor the example above to use our new hook

```tsx
import { z } from 'zod';
import useZodForm from './useZodForm';

const FieldValuesSchema = z.object({
  firstName: z.string().min(1, { message: 'First name is required' }).max(50),
  lastName: z.string().max(50).nullish(),
  age: z.number()
});

type FieldValues = z.infer<typeof FieldValuesSchema>;

export default function MyForm() {
  const {     
    register,
    handleSubmit,
    formState: { errors }, 
  } = useZodForm({ 
    schema: FieldValuesSchema,
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    // Do your form submission stuff here
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* First name */}
      <label htmlFor='firstName'>First name</label>
      <input id='firstName' {...register('firstName')} />
      {errors.firstName?.message && <p>{errors.firstName?.message}</p>}
      {/* Last name */}
      <label htmlFor='firstName'>Last name</label>
      <input id='lastName' {...register('lastName')} />
      {/* Age */}
      <label htmlFor='age'>Age</label>
      <input id='age' {...register('lastName', { valueAsNumber: true })} />

      <button type="submit">Submit</button>
    </form>
  );
}
```

While this was a small change, it simplifies our setup process for setting the resolver.

## Conclusion

In this article we looked at how to use Zod and React Hook Form together. We created a Zod schema with, setup React Hook Form to use Zod as a resolver, and did some refactoring by moving our form setup to a custom hook. Using these two libraries together lets you easily and safely build forms in React.

Further reading

- [Zod documentation](https://zod.dev/)
- [React Hook Form documentation](https://react-hook-form.com/)
- [React Hook Form Resolvers](https://github.com/react-hook-form/resolvers)
