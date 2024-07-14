import createClient from "@sanity/client";

import { clientConfig } from "./SanityConfig";

export const sanityClient = createClient(clientConfig);

// Set up a preview client with serverless authentication for drafts
export const previewClient = createClient({
  ...clientConfig,
  useCdn: false,
});

// Helper function for easily switching between normal client and preview client
export const getClient = (usePreview = false) =>
  usePreview ? previewClient : sanityClient;

export const toPlainText = (blocks): string => {
  return (blocks ?? [])
    .map((block) => {
      if (block._type !== "block" || !block.children) {
        return "";
      }

      return block.children.map((child) => child.text).join("");
    })
    .join("\n\n");
};
