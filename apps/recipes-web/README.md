# Recipes Web

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

This project combined with the [recipes-studio](https://github.com/AJax2012/gardner-web-tech/tree/main/apps/recipes-cms) app should give you an almost free method of hosting and managing your favorite recipes. Amount of users for CMS: 3. I _highly_ recommend adding whitelisted emails to your Magic link application. This will make it so only people you give permission to have read-only access to your recipes. **I do not accept fault if you add copyrighted material and host it on your own project; I do not have control over your personal CMS.**

Please note that this project is not necessary if you don't require an easier viewing experience or don't wish to share your recipes with your friends. If you _just_ need a CMS, the [recipes-studio](https://github.com/AJax2012/gardner-web-tech/tree/main/apps/recipes-cms) app will be all you will need. There is also a [standalone version](https://github.com/ajax2012/recipes-studio) that is no longer being maintained.

## Dependencies

- [Sanity CMS](https://sanity.io) with [recipes-studio](https://github.com/AJax2012/gardner-web-tech/tree/main/apps/recipes-cms)
- [Magic link](https://magic.link) (I added google and facebook authentication, but feel free to remove or alter those from the social-logins.js file)
- [Vercel](https://vercel.com) for deployments (optional)

## Getting Started

First, set up your dependencies for the [recipes-studio](https://github.com/AJax2012/gardner-web-tech/tree/main/apps/recipes-cms) and create an app with [Magic](https://magic.link).

Once your dependencies have been taken care of, change the `.env.sample.txt` file to `.env.{environment}` or `.env.local` and update the values below if needed:

```env
NEXT_PUBLIC_SANITY_DATASET='production'
NEXT_PUBLIC_SANITY_PROJECT_ID='...'
SANITY_API_TOKEN='...'
NEXT_PUBLIC_MAGIC_PUBLISHABLE_KEY=pk_live_...
MAGIC_SECRET_KEY=sk_live_...
JWT_KEY=...
NEXTAUTH_SECRET='...'
```

To create the JWT key, generate a 32 character string in a random string/password generator. To create the NEXTAUTH_SECRET, create a public SSH key either using openssh or using an SSH generator like PuTTY.

Copy and paste the results into the NEXTAUTH_SECRET variable (note, when running locally from an .env file, you should put this between quotes. When adding this to a web host, such as Vercel, you should exclude the single quotes. The same goes for everything you see in the config example above that is between single quotes.).

Run the development server:

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result. You can also change the port by changing the package.json configuration.

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

It should then build and deploy your app to Vercel!

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
