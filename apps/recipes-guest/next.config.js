const withTM = require("next-transpile-modules")(["ui"]);

/** @type {import('next').NextConfig} */
module.exports = withTM({
  reactStrictMode: true,
  images: {
    domains: ["cdn.sanity.io"],
  },
});
