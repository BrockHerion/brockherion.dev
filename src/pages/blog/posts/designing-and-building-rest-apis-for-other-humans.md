---
setup: |
  import Layout from '../../../layouts/BlogPost.astro'
title: Designing and Building REST APIs for Other Humans
subTitle: Learn how to create a REST API that will keep you and other developers happy.
slug: designing-and-building-rest-apis-for-other-humans
seoTitle: Designing and Building REST APIs for Other Humans
abstract: In this guide, you will learn how to create a REST API that will keep you and other developers happy.
isPublished: true
isFeatured: false
publishedOn: "10/04/2021"
imageSrc: /posts/designing-building-rest-apis-for-other-humans.png
---

As developers, we interact with APIs all the time. And chances are, if you're a web developer, you've interacted with a REST API at some point or another. But what if you need to create one? How do you go about doing that?

When I was presented with this, I had no idea where to begin. In this article, I will be discussing how to build and design a REST API that is easy for you to maintain and easy for other developers to consume. We'll go over what a REST API is, how to design your endpoints, and how to handle things like nested collections, paging, and filtering.

## What is a REST API?

REST stands for Representational State Transfer. Data is fetched over HTTP and usually returned in JSON format. It's important to note that REST is only a type of API, not the only type of API. There are a couple of things that make REST ideal for web developers.

REST APIs do not care about what language they are written in. You can create them in C#, Python, Java, JavaScript, Elixir, pretty much any language you can think of. The consumers can also be in any language. You can make calls to them from your web, mobile, and desktop applications. Because REST APIs accept and return their payloads as JSON, they don't care about the language they or their consumers are written in. REST APIs are stateless because of this, making them ideal for transferring data between applications.

A good way to think about how it works is like a library. Let's pretend you go to a library and are looking for ten book recommendations for a paper you're writing on Data Structures and Algorithms. The librarian disappears in the back and returns to you with a list of titles, authors, date of publication, and ISBN. You do not care about how she searched for them. You gave her a collection (books) with a filter (genre) and a limit to fetch (ten books). She will then attempt to fetch you the collection or resource you searched for. She also does not care about how you use that data. Maybe you are going to check one out or order them online, maybe just take them off the shelf and sit and quietly take notes on them. REST APIs act as a way to exchange data within a set of constraints.

## What's the best way to build one?

While seemingly simple, REST APIs can be hard to create. You have to make choices about what data should be returned and when, what actions you will allow your users to take, etc. Because there isn't a single set of best practices to follow, building an API can be hard. You can quickly find yourself getting overwhelmed with trying to build one.

How should your JSON be formatted? What should I name my endpoints? How should I handle nested relationships? These are all questions that you might yourself asking when you start creating your APIs. There are, however, some generally accepted best practices and tips that you can use to build a scalable, developer-friendly API.

### 1. Don't use action names in your URLs, use HTTP verbs instead

Let's say we want to create a new user in our application. You might be tempted to build an endpoint at the following URL

```
POST /api/users/create
```

This isn't necessarily a bad thing, but a better approach to dealing with resources is to leave the /create off and create the endpoint like

```
POST /api/users/
```

This makes it clear that we adding a resource to our collection of users. POST is the HTTP method associated with the create action. Anytime you want to create a resource, you want to use create an endpoint that accepts POST requests.

Update actions are a similar story. You can use PUT or PATCH to update a resource.

```
PATCH /api/users/1
```

Again, you will want to avoid explicitly adding the action to the end of the URL. Now, there are situations you will run into where you might consider adding the action. This is because the action you are trying to take does not fit into a nice, clean world of CRUD. Say, for example, we want to update our user's password. There are two approaches to this.

1. Do explicit checks at /api/users/1 when PATCH is sent to see if the password field has been populated
2. Create a new endpoint explicitly for this action, something like /api/users/1/update-password

In this case, you might lean towards option two. To me, this is an auth action and not something to mix in with just normally updating a user. You might have other checks too, like having them entire their current password, to update their new one.

It all comes down to your use case and what you need the API to do.

### 2. Use plural endpoints for collections

This one is pretty straightforward. When accessing a collection of items, you should be using endpoints like

```
GET /api/books
```

From the URL, it is explicitly clear that you want to access books. Not a single book, but many books. You'll want to avoid a URL like

```
GET /api/book
```

When a user is reading this, they might assume they are accessing a single book. If you do want to access a single resource from the collection, you should take advantage of the resource primary key

```
GET /api/books/1
```

The endpoint above is also extremely clear about what it's doing. You want to fetch a single, specific item with an ID of 1 from the collection of books.

### 3. Accept and return JSON

I touched on this earlier, but you absolutely want to be making sure you accept and return JSON. It's a widely accepted format that will let all kinds of consumers interact with your API and let you interact with other APIs.

Using JSON will provide a consistent, clean structure for your requests and responses. You might accept a request for creating a user with a body of

```
{
    "email": "brockheriondev@gmail.com",
    "firstName": "Brock",
    ...
}
```

You can then return errors back to the sender if they're missing any requirements in their requests. Using JSON will give you a structure to your data, but also the freedom and flexibility to add on to it and extend it later on if need be.

There is also a discussion around snake vs camel case for your JSON bodies. You'll find camel more in C# and Java APIs while snake in Python or Ruby. There are extremely popular APIs using both of those formats, but again it's important to be consistent with it. Don't mix your cases or you will make a lot of developers upset.

### 4. Use correct HTTP Status codes

This is a big one. Status codes are how you relate to your consumers the status of what operations they performed. A wrong status code can send the wrong message, leaving the dev on the other end frustrated and confused.

GET requests should return a status of 200 if the request was okay, along with the payload of whatever resource or collection was fetched. POST requests should return a status of 201 for successful creation and also include the newly created resource.

PUT and PATCH can go a few ways. They can send back a 200 with the updated resource in its payload or a 204 to mean success, but no content was returned. This choice comes down to what you want to do with it. You just need to be consistent with it. You shouldn't sometimes return a 200 with a payload and sometimes a 204. Again, you will make a lot of developers very upset.

My own thoughts on PUT and PATCH responses are they should be returning the updated resource with a 200. This is because you might have some fields that are updated not a part of the initial request, like a timestamp, and because it saves a trip back to the server to fetch the data again.

### 5. Allow for filtering, sorting, and paging

Chances are your users will want to further refine the collections they get back from you. Supporting filtering, sorting, and paging is something you should absolutely do. Let's go back to our library example from earlier. We requested books about Data Structures and Algorithms. We requested ten books, so we can use the following request to get the first page of ten books

```
GET /api/books?page=1&amount=10
```

Next, we can sort the books. It might make sense to sort them by title, so let's do that

```
GET /api/books?sort_by=title&page=1&amount=10
```

Finally, we requested books on Data Structures and Algorithms. We could have a genre field in our filtering, but chances are we'll want to use some kind of query instead. Some databases, like Postgres, support full-text searches, but you can also use tools like Elasticsearch, Apache Solr, Algolia to perform these operations for you. Let's add that specific search to our request

```
GET /api/books/q=%22Data Structures and Algorithms%22&sort_by=title&page=1&amount=10
```

Note that we need to use %22 to encode our double-quotes. We can then do a search with whatever is passed into the q parameter to search our resources.

When you have a resource with a 1-m or m-m relationship, you might want to include some of that data back. There are a number of ways to accomplish this.

For an m-m, it's easiest for me to use query parameters to search for nested resources. If I want all the books by a single author, I could do a query like

```
GET /api/books?author_id=1
```

Inversely, if I wanted to get all the authors that wrote a book, I could do

```
GET /api/authors?book_id=1
```

We could also take advantage of filters to chose which resources we want or don't want back. Let's say we want books to be optional when we get author data back. We can create a query parameter to handle that

```
GET /api/authors?include=books
```

For a 1-m, you can use a nested route. If we want to fetch all the books in a given library, we could have an endpoint like so

```
GET /api/library/1/books
```

### 6. Versioning your APIs

No software stays the same forever, so there's a pretty good chance your API will change. You want to make sure, however, that you aren't breaking anybody's code if they're using an older version of the API. You can avoid that by versioning your APIs.

There are two main ways to version your APIs. First, you can include a version in your request and response headers. Second, you can add the version as part of the URL. I personally prefer to version my API in URLs like so

```
GET /api/v1/books
```

This makes it clear that this will hit version 1 of the book's endpoint. If you need to make changes, you really shouldn't be editing that endpoint, especially if people are using it for production code. It's better to introduce version 2 of it instead.

## Conclusion

That was a lot of information! To recap, when building a REST API, you should

1. Use HTTP verbs to describe actions
2. Use plural endpoints for collections
3. Accept and return JSON
4. Use the correct HTTP status codes
5. Support filtering, sorting, and paging
6. Version your APIs

And of course, be consistent!

Following these guidelines should help you to build scalable APIs and keep other developers happy while using them. Of course, you'll want to provide good documentation for them as well.

Thank you so much for taking the time to read this. I hope you found it helpful and are able to apply this knowledge when you start building your own APIs.

Happy coding!
