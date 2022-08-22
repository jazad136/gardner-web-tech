# Recipes Studio

This is a CMS for creating, storing, and sharing recipes via sanity content studio and the [Recipes Web App](https://github.com/ajax2012/recipes-web). Using this should give you a free way to host and manage all of your favorite recipes. Amount of users for CMS: 3. I _highly_ recommend adding whitelisted emails to your client application. This will make it so only people you give permission to have read-only access to your recipes. **I do not accept fault if you add copyrighted material and host it on your own project; I do not have control over your personal CMS.**

Please note that the [recipes-web](https://github.com/AJax2012/gardner-web-tech/tree/main/apps/recipes-web) project is not necessary if you don't require an easier viewing experience or don't wish to share your recipes with your friends. If you just need a CMS, this app will be all you will need.

## Getting started

Install sanity:

```bash
npm install -g @sanity/cli
```

Once the project is cloned and sanity is installed, delete the `api` section in the `sanity.json` file and do the following in a terminal from the root of the project:

```sh
yarn sanity:start
```

This should update the sanity.json file for you. If it doesn't, copy and paste the following. Remember to add your projectId and change the dataset if you need to.

```json
{
  "root": true,
  "project": {
    "name": "recipes-cms"
  },
  "api": {
    "projectId": "",
    "dataset": "production"
  },
  "plugins": [
    "@sanity/base",
    "@sanity/default-layout",
    "@sanity/default-login",
    "@sanity/desk-tool"
  ],
  "env": {
    "development": {
      "plugins": ["@sanity/vision"]
    }
  },
  "parts": [
    {
      "name": "part:@sanity/base/schema",
      "path": "./schemas/schema"
    }
  ]
}
```

If you stopped the project, run the project to make sure it works:

```bash
yarn sanity:start
```

If it works, deploy the studio:

```bash
sanity deploy
```

Then visit the [dashboard](https://www.sanity.io/manage). Navigate to the API tab. Create a CORS origin for your application, The URL will be the URL of the web application (for local development, it would be `http://localhost:3000`) and make sure you do _not_ click "Allow credentials". Then click the Save button.

To get your token - click the "Add API token" button in the Tokens section. Set your name to whatever you prefer (I used "next-app"), then click "viewer". Click the Save button. If you are using the client, you will want to copy this value to your client application (recipes-web or recipes-guest).

## Sanity Clean Content Studio

Congratulations, you have now installed the Sanity Content Studio, an open source real-time content editing environment connected to the Sanity backend.

Now you can do the following things:

- [Read “getting started” in the docs](https://www.sanity.io/docs/introduction/getting-started?utm_source=readme)
- [Join the community Slack](https://slack.sanity.io/?utm_source=readme)
- [Extend and build plugins](https://www.sanity.io/docs/content-studio/extending?utm_source=readme)
