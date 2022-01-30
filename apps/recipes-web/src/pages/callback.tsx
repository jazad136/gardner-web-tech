import { signIn } from "next-auth/react";
import Script from "next/script";
import { PageSpinner } from "ui";
import * as Pino from "pino";

const logger = Pino.default({ name: "Callback" });

const Callback = () => {
  logger.debug(process.env.NEXT_PUBLIC_MAGIC_PUBLISHABLE_KEY);

  return (
    <>
      <PageSpinner />
      <Script
        strategy="afterInteractive"
        src="https://auth.magic.link/pnp/callback"
        data-login-uri="/login"
        data-magic-publishable-api-key={
          process.env.NEXT_PUBLIC_MAGIC_PUBLISHABLE_KEY
        }
        onLoad={() => {
          window.addEventListener(
            "@magic/ready",
            async (event: CustomEvent) => {
              const { idToken } = event.detail;

              const response = await fetch("/api/auth/callback");
              const urlData = await response.json();

              await signIn("credentials", {
                didToken: idToken,
                callbackUrl: urlData?.callbackUrl ?? null,
              });
            }
          );
        }}
      ></Script>
    </>
  );
};

Callback.auth = false;

export default Callback;
