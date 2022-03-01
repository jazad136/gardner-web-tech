import { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import { magic } from "src/lib/magic";
import { UserContext } from "src/lib/UserContext";
import EmailForm from "src/components/EmailForm";
import SocialLogins from "src/components/SocialLogins";
import * as Dialog from "@radix-ui/react-dialog";
import Head from "next/head";

const Login = () => {
  const [disabled, setDisabled] = useState(false);
  const { session, setSession } = useContext(UserContext);
  const router = useRouter();

  useEffect(() => {
    session?.user?.issuer && router.push("/");
  }, [session, router]);

  async function handleLoginWithEmail(email) {
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
          Authorization: "Bearer " + didToken,
        },
      });

      if (res.status === 200) {
        let userMetadata = await magic.user.getMetadata();
        setSession({ user: userMetadata, isLoading: false });
        router.push("/");
      }
    } catch (error) {
      setDisabled(false);
    }
  }

  async function handleLoginWithSocial(provider) {
    await magic.oauth.loginWithRedirect({
      provider,
      redirectURI: new URL("/callback", window.location.origin).href,
    });
  }

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
                  disabled={disabled}
                  onEmailSubmit={handleLoginWithEmail}
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

export default Login;
