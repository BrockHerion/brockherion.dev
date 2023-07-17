---
layout: "../../../layouts/BlogPost.astro"
title: Keep your async code fast with Promise.all()
description: Promise.all() is a method in JavaScript that you can use to resolve your Promsies in parallel. It  returns a Promise with the results of the promises passed in.
isPublished: true
isFeatured: true
publishedOn: "September 1, 2022"
---

While working on [Chirpmark](https://chirpmark.com), my app for managing Twitter bookmarks, I came across a scenario where I needed to resolve Promises in a loop. I was working on fixing a bug where I needed could only fetch 100 Tweets in a single request. The solution was the batch my requests, which meant I had to send my requests in a loop. But how could I do that when using the `fetch` API, which is asynchronyous?

The solution was to use `Promise.all()` and today, we're going to learn about this method and why it's useful. We'll talk about why you would use `Promise.all()` and how to use it with some code examples.

So grab yourself a cup of coffee, or tea if that's more your thing, and let's get into it!

## What is Promise.all()?

`Promise.all()` is a method in JavaScript for resolving multiple Promises. If you're unfamiliar with Promises, they're essentially the result of an asynchronous operation in JavaScript. The [Mozilla docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises) sum them up quite nicely with

> A Promise is an object representing the eventual completion or failure of an asynchronous operation.

Using `Promise.all()` lets us safely resolve multiple promises at once. This is useful in cases like I described above where you are running async code within a loop. You can `await` inside a `for ... of` loop just fine, but this can be slow. You have to wait for each operation to finish before moving on to the next one. The advantage to a `for...of` loop is your Promises will be resolved in the same order every single, which cannot be said for `Promise.all()`.

`Promise.all()` resolves Promises in parallel, meaning that different Promises can resolve at different times. This means that your results may not be in the same order every time. This is not a huge deal in most cases you'll run across and the speed benefit you gain from `Promise.all()` is well worth it. As you perform async operations on larger data sets, it can be painfully slow to resolve in a `for...of` loop. So unless the order of your results matters, `Promise.all()` is the way to go.

> NOTE: One thing you should NOT do is execute async code with a `forEach` loop. This will lead to the rest of your code executing and your async operations not being awaited. This can lead to some pretty wild and unpredictable results.

`Promise.all()` takes in a single argument, an iterable object such as an array. It can return a couple of things based on what you pass into it.

- A fulfilled Promise if the iterable is empty ([])
- A fulfilled Promise if the iterable contains no Promises ([1, 2, 3])
- A pending promise for all other cases, where each Promise in the iterable is either resolved or rejected

## A few simple examples of Promise.all()

The below code snippet is a simple example of using `Promise.all()`

```ts
const result = await Promise.all()([1, 2, 3]);

console.log(result); // [1, 2, 3]
```

Because none of the values in the array are Promises, `Promise.all()` will treat the array as empty and the returned Promise as fulfilled. Let's look at an example where we pass in an array of Promises

```ts
const result = await Promise.all()([Promise.resolve(1), Promise.resolve(2)]);

console.log(result); // [1, 2]
```

In the snippet above, both Promises are already resolved, so `Promise.all()` will return a fulfilled promise. Now, let's look at what happens when a Promise is rejected

```ts
const result = await Promise.all()([Promise.reject(1), Promise.resolve(2)]); // Exception is thrown
```

Here, we see that an exception is thrown when the Promise is rejected.

With those examples in mind, let's take move on to looking at how we would use `Promise.all()` in practice!

## Using Promise.all() in practice

Now we're going to look at an example of using `Promise.all()` in a real-world scenario. Similar to my situation, let's pretend we're in a situation where we need to batch requests to some external API.

We'll be fetching data from the [Pokemon API](https://pokeapi.co/) in batches and just logging it to the console for simplicities sake. We're going to be fetching three pages worth of pokemon, each page containing 150 Pokemon.

```ts
async function fetchPokemon(limit, offset) {
  // Create our requests array
  const requests = [];

  // Build out our requests
  for (let i = 0; i < offset; i++) {
    const url = `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${i}`;

    requests.push(
      new Promise((resolve, reject) => {
        fetch(url)
          .then((response) => response.json())
          .then((data) => {
            resolve(data);
          });
      })
    );
  }

  // Make our request
  const result = await Promise.all(requests);

  // Flatten the results
  const pokemon = result.flatMap((page) => page);

  // Return our Pokemon
  return pokemon;
}

const pokemon = fetchPokemon(150, 3).then((pokemon) => console.log(pokemon));
```

In the code above, we're creating new Promises around calling the PokeAPI and fetching some Pokemon for us. We're add each Promise to an array called `requests`. We then pass `requests` to `Promise.all()` and then flatten the results into a single array of Pokemon. We then return that array from our function.

## Wrap up

In this article, we took a look at why and how you would use `Promise.all()` in JavaScript. Using `Promise.all()` lets us resolve our Promises in parallel and performs much better than resolving them one at a time in a `for...of` loop. Depending on the contents of the iterable passed in, `Promise.all()` will return a Promise that was either fulfilled or rejected.

That does it for this one! If you enjoyed this article, please consider sharing. And as always, you can get in touch with me on Twitter [@BrockHerion](https://twitter.com/brockherion).

Check out the following resources for more info on Promises!

- [Promise Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)
- [Using Promises](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises)
- [Promise.all()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/all)

Happy coding!
