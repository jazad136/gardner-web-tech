import {
  createImageUrlBuilder,
  createPortableTextComponent,
  createPreviewSubscriptionHook,
  createCurrentUserHook,
} from "next-sanity";
import { config } from "./SanityConfig";
import sanityClient from "@sanity/client";

export const configuredSanityClient = sanityClient({
  ...config,
});

export const urlFor = (source: string) =>
  createImageUrlBuilder(config).image(source);

// Set up the live preview subscription hook
export const usePreviewSubscription: any =
  createPreviewSubscriptionHook(config);

export const PortableText = createPortableTextComponent({
  ...config,
  serializers: {},
});

// Helper function for using the current logged in user account
export const useCurrentUser = createCurrentUserHook(config);
