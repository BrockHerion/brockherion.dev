---
layout: "../../../layouts/BlogPost.astro"
title: The use hook is a game changer for React
slug: the-use-hook-is-a-game-changer-for-react
description: The React use hook would let use resolve promises within our React components and hooks, including on the client.
keywords: "react, hook, react hooks, javascript, typescript"
isPublished: true
isFeatured: false
publishedOn: "October 17, 2022"
image: /posts/the-use-hook-is-a-game-changer-for-react.webp
permalink: "https://brockherion.dev/blog/posts/enums-vs-typed-strings-in-typescript"
---

If you've worked with React before, there's a very good chance that you've needed to fetch some data from an external source. And with that, there's a very good chance that you've done your data fetching asynchronously and have shot yourself in the foot with `useEffect`.

Now, libraries like react-query and SWR help, but it would be nice if React was able to support promises out of the box. That's all about to change with a new RFC that was released. This RFC outlines a new hook to React that added first-class support for promises and async/await. Let's take a look at this new hook and talk about some of its implications!

## Meet the use hook

The `use` hook, which is outlined in [this RFC](https://github.com/reactjs/rfcs/pull/229/files), lets us finally use async code in React, which means no more data fetching in a `useEffect`!

In our React code, we can use the `use` hook like so:

```tsx
export async function fetchPokemon() {
  const pokemonResponse = await fetch('https://pokeapi.co/api/v2/pokemon?limit=150');

  return pokemonResponse.json(); // Returns a Promise
}

export default function PokemonList() {
  const pokemon = use(fetchPokemon);

  return (
    <ul>
      {pokemon.map(pokemon => (
          <li>{/* Normal react stuff */}</li>
      ))}
    </ul>
  );
}
```

It's that simple. No `useEffect` or external libraries are needed to do our data fetching.

Another cool thing with the `use` hook is that it can be used conditionally:

```tsx
export async function fetchPokemon() {
  const [pokemon, setPokemon] = useState<Pokemon[] | null>(null);

  const generation = 1;

  if (generation === 1) {
    const fetchedPokemon = use(fetchPokemon);
    setPokemon(fetchedPokemon);
  }

  // Rest of the component
}
```

## What does this mean for libraries like react-query and SWR?

The new `use` hook won't replace these libraries. The `use` hook, similar to `await`, is only for wrapping promises. Both react-query and SWR offer a lot of features on top of just making data fetching safer, including caching, retries, and so much more. Even when `use` is released, these libraries will most likely be the way to go for data fetching.

That being said, it will be interesting to see if/how these libraries introduce `use` into their code bases. It will be interesting to see what other new tools and libraries are created with `use` at its core. We'll also most likely be seeing new patterns emerge around this hook. For example, letting `use` be used conditionally is already a departure from other hooks. There's also a proposal in the RFC about being able to wrap React Context in a `use` hook. It does say that this feature could fall outside of the scope of this specific proposal and be implemented later on, but it would let you do things like use React Context conditionally.

## Wrap up

To me, `use` is one of the coolest features coming to React and could fundamentally change how we build React apps. I'm excited to see how `use` gets used and the new patterns that emerge from it. This is a huge feature for not just React itself, but the entire ecosystem as a whole.

How do you feel about the `use` hook? Is this the right direction for React to go? I would love to hear your thoughts on it! You can connect with me on Twitter [@BrockHerion](https://twitter.com/brockherion) or you can [send me an email](mailto:brockherion.dev@gmail.com).
