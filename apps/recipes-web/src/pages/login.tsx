import { useEffect, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import EmailForm from "src/components/EmailForm";
import SocialLogins from "src/components/SocialLogins";
import { CustomNextPage } from "src/lib/CustomNextPage";
import { magic } from "src/lib/magic";
import * as Dialog from "@radix-ui/react-dialog";
import { GetServerSideProps } from "next";
import { tokens } from "../lib/constants";
import { Magic } from "@magic-sdk/admin";

const LoginPage: CustomNextPage = () => {
  const [disabled, setDisabled] = useState(false);
  const router = useRouter();

  const handleLoginWithEmail = async (email: string) => {
    try {
      setDisabled(true);

      let didToken = await magic.auth.loginWithMagicLink({
        email,
        redirectURI: new URL("/callback", window.location.origin).href,
      });

      const res = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${didToken}`,
        },
      });

      if (res.status === 200) {
        router.push("/");
      }
    } catch (error) {
      setDisabled(false);
    }
  };

  const handleLoginWithSocial = async (provider) => {
    setDisabled(true);
    await magic.oauth.loginWithRedirect({
      provider,
      redirectURI: new URL("/callback", window.location.origin).href,
    });
    setDisabled(false);
  };

  return (
    <>
      <Head>
        <title>Login</title>
        <meta name="description" content="Recipes Login" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Dialog.Root open={true}>
          <Dialog.Portal>
            <Dialog.Overlay className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 sm:w-96 max-h-[95] md:max-h-[85vh] p-6 pb-8 text-center shadow-md box-border bg-slate-50 dark:bg-slate-700 rounded-xl border">
              <Dialog.Title className="flex flex-col text-center text-2xl my-6 mx-0">
                Login
              </Dialog.Title>
              <Dialog.Content>
                <EmailForm
                  onEmailSubmit={handleLoginWithEmail}
                  isDisabled={disabled}
                />
                <SocialLogins onSubmit={handleLoginWithSocial} />
              </Dialog.Content>
            </Dialog.Overlay>
          </Dialog.Portal>
        </Dialog.Root>
      </main>
    </>
  );
};

LoginPage.layout = {
  includeContainer: true,
  includeNavAndFooter: false,
};

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const serverMagic = new Magic(process.env.MAGIC_SECRET_KEY);
  const didToken = req.cookies[tokens.didToken];

  if (didToken) {
    try {
      serverMagic.token.validate(didToken);
      const callbackUrl = req.cookies[tokens.callbackUrl] ?? "/";
      res.statusCode = 302;
      res.setHeader("Location", callbackUrl);
    } catch {
      serverMagic.users.logoutByIssuer(didToken);
    }
  }
  return {
    props: {},
  };
};

export default LoginPage;
