# create-ntmt-app ![version](https://img.shields.io/badge/version-0.1.0-blue) [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

**Generate an NTMT App - NextJS, TypeScript, MongoDB, Tailwind CSS quickly using this boilerplate.**

An easy to use boilerplate contains ready-to-go Next project, containing a MongoDB Driver, TypeScript and Tailwind CSS support.
You can also add testing with cypress (jest included out of the box).

No useless premade code/components! Just start writing your app instantly ⚡

## Usage

**Please make sure you have Node installed on your machine.**
```sh
npx create-ntmt-app my-app
cd my-app
```

If you are using older versions of npm (5.2 or less), you cannot utilize [npx](https://medium.com/@maybekatz/introducing-npx-an-npm-package-runner-55f7d4bd282b).
Use this approach instead:

```sh
npm install -g create-ntmt-app
create-ntmt-app my-app
cd my-app
```

If you want cypress support for testing, add the "with-cypress" flag to the command, after the app name:
```sh
npx create-ntmt-app my-app with-cypress
cd my-app
```

## Additional Features
The boilerplate contains testing capabilities, as shown, using cypress and jest to maximize Unit and Integration testing. I have included the [start-server-and-test](https://github.com/bahmutov/start-server-and-test) to allow for cypress testing while running the dev server.

The boilerplate contains the [tailwind-merge](https://github.com/dcastil/tailwind-merge) package to allow merging tailwind classes, which I found really useful.

The boilerplate contains a predefined MongoDB driver which exports a clientPromise that can be shared across the entire app in order to access the database. The driver can be found under `lib/mongodb.ts`.

[next-auth](https://next-auth.js.org/) support might be added in the near future to the boilerplate since I use it quite often.

## Get Started
This is the structure of the project you will be getting:

```
my-app
├── lib
│   ├── mongodb.ts
├── pages
│   ├── api
│   ├── _app.tsx
│   ├── index.tsx
├── public
│   ├── favicon.ico
│   ├── vercel.svg
├── styles
│   ├── globals.css
├── .env.local
├── .eslintrc.json
├── .gitignore
├── next-env.d.ts
├── next.config.js
├── package-lock.json
├── package.json
├── postcss.config.js
├── tailwind.config.js
├── tsconfig.json
├── yarn.lock
```

With cypress, you will also be getting:
```
├── cypress
│   ├── e2e
│   │   ├── app.cy.ts
│   ├── fixtures
│   │   ├── example.json
│   ├── support
│   │   ├── commands.ts
│   │   ├── e2e.ts
├── cypress.config.ts
```

You can start building your app as you would with [create-next-app](https://nextjs.org/docs/api-reference/create-next-app).

To get started with MongoDB, add your MongoDB url in MONGODB_URI environemntal variable at `.env.local`:
```
MONGODB_URI=<your_mongodb_url>
```

## Thats It! 👊
Thanks for using this package, happy coding!

## Issues?
If you encounter any issues with the boilerplate, [submit an issue](https://github.com/zivnadel/create-ntmt-app/issues/new) and **make sure to include explanation and code examples.**

## License
create-ntmt-app is open source software under [MIT License](https://github.com/zivnadel/create-ntmt-app/blob/master/LICENSE.md)

[@zivnadel](https://github.com/zivnadel)
