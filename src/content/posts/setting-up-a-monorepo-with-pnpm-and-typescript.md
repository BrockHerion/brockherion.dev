---
title: Setting up a monorepo with pnpm and TypeScript
description: Learn about monorepos and how to set them up for your TypeScript projects using pnpm
isPublished: true
isFeatured: true
publishedOn: "August 1, 2022"
---

Have you ever worked on a project where each app that was a part of it was in a different repository? It can be frustrating and time-consuming to deal with. Or maybe you have some code that you’d like to share between projects, but don’t want to deal with having to set up and manage an NPM package.

Enter the monorepo. Monorepos enable you to put all of your apps for a project in a single repository, share code between them, and more! And while this is not a new concept, modern tooling makes it easy to get one setup. In this article, I’ll show you how you can setup a monorepo for a Node project using pnpm and TypeScript.

## Setting up our monorepo workspace with pnpm

pnpm is an alternative to npm and yarn. It has quite a few noticeable improvements over both of them, including faster package installation, a non-flat node_modules structure, disk space optimization, and, what we care about, built-in monorepo support. If you don’t have pnpm setup already on your system, head on over to [https://pnpm.io/installation](https://pnpm.io/installation) for details on how to install it for your system.

With pnpm installed, we can create a new Node project like so

```bash
$ pnpm init
```

Our project should now have a package.json for us to use. Now we can go ahead and add a couple of folders and files we’ll need.

First, we should install our root package dependencies. Go ahead and run

```bash
$ pnpm add -D typescript @types/node
```

Next, create a new file called pnpm-workspace.yaml. Here, we will configure all the different projects that we’ll have. Open up the file and add the following lines to it.

```yaml
# pnpm-workspace.yaml
packages:
  - "admin"
  - "client"
  - "shared"
```

What we’re doing here is telling pnpm that we’ll have three projects that it needs to keep track of. For this example, we’ll be creating two React apps with Vite for our Admin and Client, and then having a shared project they both use code from.

Before we create those however, we need to setup our base tsconfig.json file. Let’s go ahead and create two new files. The first one we’ll create is tsconfig.base.json. Add the following configuration options to it.

```json
// tsconfig.base.json
{
  "compilerOptions": {
    "strict": true,
    "strictNullChecks": true,
    "esModuleInterop": true,
    "emitDecoratorMetadata": true,
    "experimentalDecorators": true,
    "noUnusedLocals": true,
    "skipLibCheck": true,
    "sourceMap": true,
    "jsx": "react-jsx",
    "moduleResolution": "node"
  }
}
```

Of course, feel free to tweak your TypeScript settings as you see fit. This is how I have mine setup and it works well for my projects.

Now we can create our actual tsconfig.json. To have it inherit from our base, we need to add the following line to it.

```json
// tsconfig.json
{
  "extends": "./tsconfig.base.json"
}
```

We are now ready to start adding our projects!

## Creating our shared project

Our next step is to create our shared project. To start, create a new folder called shared and add a new package.json file to it. This project will contain a simple type and function that we can share between our codebases.

Add the following lines to your new package.json file.

```json
// shared/package.json
{
  "name": "@monorepo/shared",
  "private": true
}
```

> Note that if you want to have any shared React components, you will need to add React as a dependency to this project. You can view this in the demo repo, which I’ve linked at the end of the article.

Let’s add a new file here called index.ts. In this file, we will have an interface representing a user and a function that shows an alert to greet the user.

```ts
// shared/index.ts
export interface User {
  firstName: string;
  lastName: string;
  email: string;
  isAdmin: boolean;
}

export function greetUser(user: User) {
  alert(
    `Hello, ${user.firstName} ${user.lastName}! You are ${
      user.isAdmin ? "an admin." : "not an admin."
    }`
  );
}
```

This is all we need to start sharing code between our client apps.

## Configuring our frontend React apps

Our next step is to actually configure our frontends. We’re going to be creating two apps, one for our client and one for our admin using React with Vite and, of course, TypeScript.

We can create them in our terminal with the following commands.

```bash
$ pnpm create vite admin --template react-ts
$ pnpm create vite client --template react-ts
```

The default setup for each project is fine. The one change we do have to make is in each projects package.json. We need to add a reference to our shared project and update our project names.

```json
// admin/package.json
{
	"name": "@monorepo/admin",
	// ...
	"dependencies": {
		"@monorepo/shared": "workspace:*",
		// ...
  },
}

// client/package.json
{
	"name": "@monorepo/client",
	// ...
	"dependencies": {
		"@monorepo/shared": "workspace:*",
		// ...
  },
}
```

Run pnpm install to install the necessary dependencies for each project and we can now share code between our React apps.

## Sharing code between our apps

Let’s start with our admin app. In your App.tsx file, let’s create a new admin user and add a button to greet the new user.

```ts
// admin/src/App.tsx
import { User, greetUser } from "@monorepo/shared"

function App() {
	const user: User = {
		firstName: "Admin",
		lastName: "User",
		email: "adminuser@test.com"
		isAdmin: true,
	};

	const onGreetClicked = () => {
		greetUser(user);
	}

	return (
		<div className="App">
			<h1>Admin App</h1>
			<button onClick={onGreetClicked}>Greet Admin!</button>
		</div>
	);
}

export default App;
```

Now if we run the admin app and navigate to that page in our browser, you should see our header and our button. Clicking the button should give a page alert with the text ‘Hello, Admin User! You are an admin.’

In the client app, open up the App.tsx file and update it with the following code.

```ts
// client/src/App.tsx
import { User, greetUser } from "@monorepo/shared"

function App() {
	const user: User = {
		firstName: "Client",
		lastName: "User",
		email: "clientuser@test.com"
		isAdmin: false,
	};

	const onGreetClicked = () => {
		greetUser(user);
	}

	return (
		<div className="App">
			<h1>Client App</h1>
			<button onClick={onGreetClicked}>Greet Client!</button>
		</div>
	);
}

export default App;
```

Once again, run the app and click the button. You should see an alert with the text ‘Hello, Client User! You are not an admin.’

With this, we now have a fully functioning monorepo and can share code between our applications!

## Wrap up

In this article, we looked at how to setup a monorepo using pnpm. We also saw how we can share code between our apps. While simple, I hope that this example shows you the potential of using a monorepo for your TypeScript projects.

For a complete example app that includes shared React components and Turbrepo, you can check out my monorepo example repository on my GitHub at vite-pnpm-turbo-monorepo.
More information on monorepos and the technology used for this example can be found with the links below.

- [https://pnpm.io/workspaces](https://pnpm.io/workspaces)
- [https://vitejs.dev/](https://vitejs.dev/)
- [https://semaphoreci.com/blog/what-is-monorepo](https://semaphoreci.com/blog/what-is-monorepo)

Happy coding!
