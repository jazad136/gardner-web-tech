import {
  createPortableTextComponent,
  createPreviewSubscriptionHook,
  createCurrentUserHook,
  createImageUrlBuilder,
} from "next-sanity";
import { config } from "./SanityConfig";
import sanityClient, { SanityClient } from "@sanity/client";
import { ImageUrlBuilder } from "next-sanity-image";

export const configuredSanityClient: SanityClient = sanityClient({
  ...config,
});

export const urlFor = (source: string): ImageUrlBuilder =>
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
