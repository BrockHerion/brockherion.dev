---
title: "You might be using JavaScript objects wrong"
description: "Objects and maps are used to store key-value pairs in JavaScript. When you should use one over the other?"
keywords: "typescript, javascript, js, javascript object, js object, map, javascript map"
isPublished: true
isFeatured: true
publishedOn: "March 18, 2023"
---

Objects are a data structure in JavaScript that store data in key-value pairs. They're a great way to represent structured data, but it may not always be the best choice depending on how you use it. Objects shine when you have a pre-defined structure for your data and for quick lookups. If you're frequently changing properties or value from an object, you may want to consider using a map. In this article, we'll be looking at what areas objects shine in and when you might want to use a map instead.

## Using objects in JavaScript

JavaScript objects are best when you have a set structure of data and need to access values via properties. They have a very fast lookup time of `O(1)`. We can access our values by either doing `object.property` or `object['property']`.

```js
const colors = {
  red: 'Red',
  green: 'Green',
  blue: 'Blue'
};

console.log(colors.red); // => Red
console.log(colors['red']); // => Red
```

This is a pretty common use case. We're defining a variable `colors` that contains, well, different colors. Because we know our colors ahead of time, we can put them in an object and take advantage of it's quick lookup time.

Now let's pretend that we need to dynamically add and remove colors. Objects can handle this case as well.

```js
const colors = {
  red: 'Red',
  green: 'Green',
  blue: 'Blue'
};

// Add a new property
colors.yellow = 'Yellow';

console.log(colors); // =>  { red: 'Red', green: 'Green', blue: 'Blue', yellow: 'Yellow' }

// Remove the color we just added
delete colors.yellow;

console.log(colors); // =>  { red: 'Red', green: 'Green', blue: 'Blue' }
```

The above example does exactly what we need it to, but may not be best for our case. For one things, objects themselves are not iterable. This means that if we wanted to loop through all our key-value pairs, we can't do `colors.forEach`. If we wanted to loop through our colors, we would need to something like this.

```js
const colors = {
  red: 'Red',
  green: 'Green',
  blue: 'Blue'
};

for (let color of Object.values(colors)) {
  console.log(color); // => Red, Blue, Green
}
```

Again this works, but what if we need the keys along with the values? And what if we decide we need to change the type of our key? Object keys can only be strings. There's also performance implications due to how objects are compiled. If you're adding and removing a lot of properties, you'll take a performance hit. In these cases, you'll want to look at using JavaScript's map type instead of an object.

## Introducing JavaScript maps

Maps, like objects, store date in key-value pairs. Unlike objects, whose keys can only be strings, map keys can be any type. They are also iterable and ordered, meaning they can be used in a normal `for...of` loop and insertion order is remembered. Maps also have built-in methods for data setting and accessing data.

If we rewrite our example from above using a map instead of an object, it would look like this.

```js
const colors = new Map();

colors.set("red", "Red");
colors.set("blue", "Blue");
colors.set("green", "Green");

console.log(colors.get("red")); // => Red
```

To remove an item from a map, all we need to do is use the `delete` method.

```js
const colors = new Map();

colors.set("red", "Red");
colors.set("blue", "Blue");
colors.set("green", "Green");

// Add yellow
colors.set("yellow", "Yellow");
console.log(colors); // =>  { red => 'Red', green => 'Green', blue => 'Blue', yellow => 'Yellow' }

// Delete yellow
colors.delete("yellow");
console.log(colors); // =>  { red => 'Red', green => 'Green', blue => 'Blue' }
```

And if we want to iterate over our map, we can do so in a few different ways.

```js
// Normal for...of loop
for (let [key, value] of colors) {
  console.log({ key, value }); // { key: "red", value: "Red" }, etc.
}

// forEach method
colors.forEach((key, value) => {
  console.log({ key, value }); // { key: "red", value: "Red" }, etc.
});
```

## When to use an object or a map

When to use an object or a map comes down to what it is you're trying to do. If you need a data structure that you create once and are just accessing properties on it, then an object is your best bet. While both objects and maps have `O(1)` time for data access, objects will be faster simply because of how they're compiled.

On the flip side, maps are fantastic if need non-string keys, have unknown keys at runtime, will be setting and removing data frequently, or need to iterate over your data. They're are better suited for these use cases than objects are. Maps also have the benefit of not inheriting from `Object.prototype`, meaning you can't accidentally override object properties like `toString` and `constructor`.

## More resources

- [MDN object documentation](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)
- [MDN map documentation](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map)
- [Stack Overflow discussion on objects vs maps](https://stackoverflow.com/questions/18541940/map-vs-object-in-javascript)
