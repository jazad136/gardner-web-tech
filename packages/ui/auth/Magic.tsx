import { Magic } from "magic-sdk";
import { OAuthExtension } from "@magic-ext/oauth";

// Create client-side Magic instance
const createMagicClient = (key: string) => {
  return (
    typeof window != "undefined" &&
    new Magic(key, {
      extensions: [new OAuthExtension()],
    })
  );
};

export const magicClient = (key: string) => createMagicClient(key);
