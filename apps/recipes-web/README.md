# Recipes Web

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

This project combined with the [recipes-studio](https://github.com/AJax2012/gardner-web-tech/tree/main/apps/recipes-cms) app should give you an almost free method of hosting and managing your favorite recipes. Amount of users for CMS: 3. I _highly_ recommend adding whitelisted emails to your client application. This will make it so only people you give permission to have read-only access to your recipes. **I do not accept fault if you add copyrighted material and host it on your own project; I do not have control over your personal CMS.**

Please note that this project is not necessary if you don't require an easier viewing experience or don't wish to share your recipes with your friends. If you _just_ need a CMS, the [recipes-studio](https://github.com/AJax2012/gardner-web-tech/tree/main/apps/recipes-cms) app will be all you will need. There is also a [standalone version](https://github.com/ajax2012/recipes-studio) that is no longer being maintained.

## Dependencies

- [Sanity CMS](https://sanity.io) with [recipes-studio](https://github.com/AJax2012/gardner-web-tech/tree/main/apps/recipes-cms)
- [Next Auth](https://next-auth.js.org) (I added email, facebook, and google authentication, but feel free to remove or alter those from the social-logins.js and the [...nextauth].ts files) Follow the instructions in the [Next-Auth documentation](https://next-auth.js.org/getting-started/introduction) to change providers or get credentials for providers.
- [Upstash](https://upstash.com) for Next-Auth database adapter.
- [Vercel](https://vercel.com) for deployments (optional)

## Getting Started

First, set up your dependencies for the [recipes-studio](https://github.com/AJax2012/gardner-web-tech/tree/main/apps/recipes-cms).

Once your dependencies have been taken care of, change the `.env.sample.txt` file to `.env.{environment}` or `.env.local` and update the values below if needed:

```env
NEXTAUTH_URL="http://localhost:3000/"
NEXTAUTH_SECRET=...

EMAIL_SERVER=...
EMAIL_FROM=...
EMAIL_REPLY_TO=...
APPROVED_EMAILS=...

UPSTASH_REDIS_REST_URL=...
UPSTASH_REDIS_REST_TOKEN=...

FACEBOOK_CLIENT_ID=...
FACEBOOK_CLIENT_SECRET=...

GOOGLE_CLIENT_ID=...
GOOGLE_CLIENT_SECRET=...

NEXT_PUBLIC_SANITY_DATASET='production'
NEXT_PUBLIC_SANITY_PROJECT_ID='...'
SANITY_API_TOKEN='...'
```

### Get Environment Variables

#### NEXTAUTH_URL

This is the URL of the application. For local development, the preset is http://localhost:3000/.

#### NEXTAUTH_SECRET

To create the JWT key, generate a 32 character string in a random string/password generator. To create the NEXTAUTH_SECRET, create a public SSH key either using openssh or using an SSH generator like PuTTY.

Copy and paste the results into the NEXTAUTH_SECRET variable (note, when running locally from an .env file, you should put this between quotes. When adding this to a web host, such as Vercel, you should exclude the single quotes. The same goes for everything you see in the config example above that is between single quotes.).

#### EMAIL_SERVER

I used SendGrid, but use whatever SMTP server you prefer. The accepted format according to the [Next-Auth documentation](https://next-auth.js.org/providers/email#configuration) is `smtp://username:password@smtp.example.com:587`.

#### EMAIL_FROM and EMAIL_REPLY_TO

Use whatever emails you want for these. If you use SendGrid, make sure you verify your `EMAIL_FROM` address as a Single Sender under [https://app.sendgrid.com/settings/sender_auth](https://app.sendgrid.com/settings/sender_auth). EMAIL_REPLY_TO does not need to be verified.

#### APPROVED_EMAILS

These are the emails that you prefer to access your recipes application. If you do not wish to use this app as a private application, remove this, then make the necessary adjustments in the `[...next-auth].ts` file.

#### UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN

Sign up for an [Upstash Redis](https://console.upstash.com/login) account. Once you are signed up for an account, make sure Redis is selected in the navbar, then click the "Create Database" button. The Details tab has the configuration you need under the REST API section in the `.env` tab. Copy and paste those values into your `.env` file.

#### FACEBOOK_CLIENT_ID and FACEBOOK_CLIENT_SECRET

Follow the [official Facebook documentation](https://developers.facebook.com/docs/development/create-an-app/) to create your Facebook application. Upon completion, copy the App ID and paste next to the FACEBOOK_CLIENT_ID in your `.env` file. Copy the App secret and value and paste next to the FACEBOOK_CLIENT_SECRET in your `.env` file.

#### GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET

Follow the [official Google documentation](https://developers.google.com/identity/protocols/oauth2) to create your Google OAuth 2.0 application. Make sure you select "Web application" for the application type. Upon completion, copy the Client ID and paste next to the GOOGLE_CLIENT_ID in your `.env` file. Copy the Client secret and value and paste next to the GOOGLE_CLIENT_SECRET in your `.env` file.

#### NEXT_PUBLIC_SANITY_DATASET, NEXT_PUBLIC_SANITY_PROJECT_ID, and SANITY_API_TOKEN

For more in-depth instructions, please view the recipes-cms project's [README file](https://github.com/AJax2012/gardner-web-tech/tree/main/apps/recipes-cms).

First, remove the projectId value from the [sanity.json file](https://github.com/AJax2012/gardner-web-tech/blob/main/apps/recipes-cms/sanity.json).

Then, in the root of the project, run the following in your terminal:

```sh
yarn sanity:start
```

This will boot up your sanity application. Once the application is booted up, navigate to [http://localhost:3333](http://localhost:3333) to view your application. You will need to login using whatever provider you prefer. Run the deploy script to deploy your instance of the recipes CMS application:

```sh
yarn sanity:deploy
```

Once you have logged in locally, navigate to [https://www.sanity.io/manage/personal/projects](https://www.sanity.io/manage/personal/projects) to access your admin console. You may need to log in again, since this is the sanity.io domain and not your local instance. Click on "recipes-cms" (unless you changed the application name before running).

The "PROJECT ID" is the value needed for `NEXT_PUBLIC_SANITY_PROJECT_ID` in your `.env` file.

Navigate to the Datasets section. The "title" is the value you need for `NEXT_PUBLIC_SANITY_DATASET` in your `.env` file.

Navigate to the API tab. Create a CORS origin for your application, The URL will be the URL of the web application (for local development, it would be `http://localhost:3000`) and make sure you do _not_ click "Allow credentials". Then click the Save button.

To get your token - click the "Add API token" button in the Tokens section. Set your name to whatever you prefer (I used "next-app"), then click "viewer". Click the Save button.

You should see a dialogue pop up after creating your token. Copy the value inside of the white box and save that as your `SANITY_API_TOKEN`.

### Run the server locally

Run the development server:

```sh
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
