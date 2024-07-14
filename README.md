# Gardner Web and Tech

This is a project to keep and maintain all of the projects to be at [gardnerwebtech.com](#) in the future. Currently, I have 2 versions of the Recipes-Web app (one with auth, one without) as well as the recipes-cms project and the beginnings of my personal website. The guest app is being hosted at [recipes-guest.vercel.app](https://recipes-guest.vercel.app) with fake recipes. The full app is a white-listed application that is not for public use.

## Projects

The projects are:

- [recipes-cms](https://github.com/AJax2012/gardner-web-tech/tree/main/apps/recipes-cms)
- [recipes-guest](https://github.com/AJax2012/gardner-web-tech/tree/main/apps/recipes-guest) (port 3001)
- [recipes-web](https://github.com/AJax2012/gardner-web-tech/tree/main/apps/recipes-web) (port 3000)
- [web](https://github.com/AJax2012/gardner-web-tech/tree/main/apps/web) (port 3002)

## Turborepo Notes

This is an official Yarn v1 starter turborepo.

## What's inside?

This turborepo uses [Yarn](https://classic.yarnpkg.com/lang/en/) as a package manager. It includes the following packages/apps:

### Apps and Packages

- `recipes-cms`: a [Sanity](https://sanity.io) app
- `recipes-guest`: a [Next.js](https://nextjs.org) app without authentication
- `recipes-web`: another [Next.js](https://nextjs.org) app _with_ authentication
- `web`: yet another [Next.js](https://nextjs.org) stubbed out for my future personal application.
- `ui`: a stub React component library shared by both `web` and `docs` applications
- `config`: `eslint` configurations (includes `eslint-next`, `postcss.config`, and `tailwind.config`)
- `tsconfig`: `tsconfig.json`s used throughout the monorepo

### Utilities

This turborepo has some additional tools already setup for you:

- [TypeScript](https://www.typescriptlang.org/) for static type checking
- [ESLint](https://eslint.org/) for code linting
- [Jest](https://jestjs.io) test runner for all things JavaScript
- [Prettier](https://prettier.io) for code formatting

### Remote Caching

Turborepo can use a technique known as [Remote Caching (Beta)](https://turborepo.org/docs/features/remote-caching) to share cache artifacts across machines, enabling you to share build caches with your team and CI/CD pipelines.

By default, Turborepo will cache locally. To enable Remote Caching (Beta) you will need an account with Vercel. If you don't have an account you can [create one](https://vercel.com/signup), then enter the following commands:

```
cd my-turborepo
npx turbo login
```

This will authenticate the Turborepo CLI with your [Vercel account](https://vercel.com/docs/concepts/personal-accounts/overview).

Next, you can link your Turborepo to your Remote Cache by running the following command from the root of your turborepo:

```
npx turbo link
```

## Useful Links

Learn more about the power of Turborepo:

- [Pipelines](https://turborepo.org/docs/features/pipelines)
- [Caching](https://turborepo.org/docs/features/caching)
- [Remote Caching (Beta)](https://turborepo.org/docs/features/remote-caching)
- [Scoped Tasks](https://turborepo.org/docs/features/scopes)
- [Configuration Options](https://turborepo.org/docs/reference/configuration)
- [CLI Usage](https://turborepo.org/docs/reference/command-line-reference)
