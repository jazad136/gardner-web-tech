# Recipes Web

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

This project combined with the [recipes-cms](https://github.com/AJax2012/gardner-web-tech/tree/main/apps/recipes-cms) app should give you an almost free method of hosting and managing your favorite recipes. Amount of users for CMS: 3. If you are planning on hosting this application publicly, I _highly_ recommend using the recipes-web project instead and following the instructions in the readme there. **I do not accept fault if you add copyrighted material and host it on your own project; I do not have control over your personal CMS.**

Please note that this project is not necessary if you don't require an easier viewing experience or don't wish to share your recipes with your friends. If you _just_ need a CMS, the [recipes-studio](https://github.com/AJax2012/gardner-web-tech/tree/main/apps/recipes-cms) app will be all you will need. There is also a [standalone version](https://github.com/ajax2012/recipes-studio) that is no longer being maintained.

## Dependencies

- [Sanity CMS](https://sanity.io) with [recipes-studio](https://github.com/AJax2012/gardner-web-tech/tree/main/apps/recipes-cms)
- [Vercel](https://vercel.com) for deployments (optional)

## Getting Started

First, set up your dependencies for the [recipes-studio](https://github.com/AJax2012/gardner-web-tech/tree/main/apps/recipes-cms). Make sure the dataset is public.

Once your dependencies have been taken care of, change the `.env.sample.txt` file to `.env.{environment}` or `.env.local` and update the values below if needed:

```env
NEXT_PUBLIC_SANITY_DATASET='production'
NEXT_PUBLIC_SANITY_PROJECT_ID='...'
```

Run the development server from `gardner-web-tech` directory:

```bash
yarn dev
```

Open [http://localhost:3002](http://localhost:3002) with your browser to see the result. You can also change the port by changing the package.json configuration.

## Hosting with Vercel

If you would like to host this repository with Vercel

- Branch this project
- Create a new project in your [dashboard](https://vercel.com/dashboard). (Login to GitHub if necessary)
- Find the correct repository and click the "Import" button
- Set the Framework to Next.js
- Change the root directory to be `apps/recipes-guest`
- Override the build command to be `cd ../.. && npx turbo run build --scope=recipes-guest --include-dependencies --no-deps`
- Add the environment variables found in the `.env` file.
- Click deploy

It should then build and deploy your app to vercel!

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel (from default readme)

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## TODOs

- add theming if requested.
