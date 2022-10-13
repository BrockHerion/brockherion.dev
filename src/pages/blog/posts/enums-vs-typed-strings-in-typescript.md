---
layout: "../../../layouts/BlogPost.astro"
title: Enums vs String Literal Types in TypeScript
subTitle: In TypeScript, named constants can be created by using an enum or with a union of string literal types.
slug: enums-vs-typed-strings-in-typescript
description: In TypeScript, named constants can be created by using an enum or with a union of string literal types.
isPublished: true
isFeatured: false
publishedOn: "October 11, 2022"
image: /posts/enums-vs-typed-strings-in-typescript.webp
permalink: "https://brockherion.dev/blog/posts/enums-vs-typed-strings-in-typescript"
---

In TypeScript, there are a few ways to express named constants. If you're familar with backend languages like C# and Java, there's a very good chance that you've worked with enums. TypeScript supports enums as well and is one of the few TypeScript features has that JavaScript does not.

However, enums are not the only way to create named constants in TypeScript. One other way is to use a union of string literals, and in this article, we're going to look at what the differences are between each approach.

So grab yourself a cup of coffee, or tea if that’s more your thing, and let’s get into it!

## Using String Literal Types

String literal types are about as simple as can be:

```ts
type ElectricCarBrands = 'Tesla' | 'Polestar' | 'Rivian' | 'LucidMotors';
```

We can then use our new type like so:

```ts
export function getBrandDetails(carBrand: ElectricCarBrand) {
  // Fetch details based on brand
}

getBrandDetails('Tesla'); // Valid, gets Tesla's details

getBrandDetails('Toyota'); // Error, 'Toyota' is not assignable to type ElectricCarBrand

```

String literal types have the advantage of not generating any extra code when we build our application, which leads to a smaller JavaScript bundle. This type is only used by TypeScript at compile time. TypeScipt will also provide you with auto-completion for your string values, making usage even easier.

## Using Enums

Enums are also easy to use and understand in TypeScript. You can create one like so:

```ts
enum ElectricCarBrands {
  Tesla,
  Polestar,
  Rivian,
  LucidMotors,
}
```

Enums in TypeScript represent both strings and numbers. In the example above, `Tesla` would be assigned a value of `0`, `Polestar` a value of `1`, and so on. If we wanted to, we could assign our own intializers to our enum values:

```ts
enum ElectricCarBrands {
  Tesla = 1,
  Polestar,
  ...
}
```

The values in the enum still represent numbers, but in this case we're starting with `Tesla` and `1` and incrementing from there. This means `Polestar` would have a value of `2`.

And we can now use enum in a function:

```ts
import { ElectricCarBrands, getBrandDetails } from './car-brands';

export function getBrandDetails(brand: ElectricCarBrands) {
  // Fetch details based on brand
}

getBrandDetails(ElectricCarBrands.Tesla);
```

Unlike string literal types, enums generate code when compiled to JavaScript. Our enum above will generate the following JavaScript code when we build it:

```js
"use strict";
var ElectricCarBrands;
(function (ElectricCarBrands) {
    ElectricCarBrands[ElectricCarBrands["Telsa"] = 0] = "Telsa";
    ElectricCarBrands[ElectricCarBrands["Polestar"] = 1] = "Polestar";
    ElectricCarBrands[ElectricCarBrands["Rivian"] = 2] = "Rivian";
    ElectricCarBrands[ElectricCarBrands["LucidMotors"] = 3] = "LucidMotors";
})(ElectricCarBrands || (ElectricCarBrands = {}));
```

## String Enums

We can also assign strings to our enum values:

```ts
enum ElectricCarBrands {
  Tesla = "Tesla",
  Polestar = "Polestar",
  Rivian = "Rivian",
  LucidMotors = "LucidMotors",
}
```

String enums are useful when you're trying to debug an issue with your code. Instead of trying to figure out what value some number corresonds to, you have a readable and meaningful value to help you.

String enums also have a smaller footprint when compiled to JavaScript:

```js
"use strict";
var ElectricCarBrands;
(function (ElectricCarBrands) {
    ElectricCarBrands["Telsa"] = "Telsa";
    ElectricCarBrands["Polestar"] = "Polestar";
    ElectricCarBrands["Rivian"] = "Rivian";
    ElectricCarBrands["LucidMotors"] = "LucidMotors";
})(ElectricCarBrands || (ElectricCarBrands = {}));
```

## Which should you use?

Like all things in software development, it depends. I personally prefer using string literal types. To me, they're simpler and have no footprint when compiled to JavaScript. With applications I build, I haven't had a case where I've needed something specific that an enum does over a string literal type.

That being said, you might have a situation where an enum just makes more sense. For example, with an enum you can iterate over it's values. You cannot do that with a string literal type. There is also this case that Cam Pedersen describes in a similar article on [Enums vs String Literals in TypeScript](https://campedersen.com/enum-vs-string/).

## Wrap up

That does it for this one! If you enjoyed this article, please consider sharing. And as always, you can get in touch with me on Twitter [@BrockHerion](https://twitter.com/brockherion) or you can [send me an email](mailto:brockherion.dev@gmail.com).

Check out the following resources for more info on enums and string literal types!

- [Enums](https://www.typescriptlang.org/docs/handbook/enums.html)
- [Literal Types](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#literal-types)
- [Union Types](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#union-types)

Happy coding!
