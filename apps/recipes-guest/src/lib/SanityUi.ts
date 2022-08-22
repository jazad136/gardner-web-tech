import sanityClient from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

import { clientConfig } from "./SanityConfig";

export const client = sanityClient({
  ...clientConfig,
});

const builder = imageUrlBuilder(client);

export const urlFor = (source: string) => {
  return builder.image(source);
};
