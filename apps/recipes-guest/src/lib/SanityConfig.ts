import { ClientConfig } from "@sanity/client";

export const clientConfig: ClientConfig = {
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  apiVersion: "2022-01-27",
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
};
