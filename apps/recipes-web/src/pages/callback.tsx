import { useEffect, useContext } from "react";
import { useRouter } from "next/router";
import { magic } from "src/lib/magic";
import { PageSpinner } from "ui";
import Head from "next/head";

const notAcceptedCallbackUrls = ["/login", "/callback"];

const Callback = () => {
  const router = useRouter();

  // The redirect contains a `provider` query param if the user is logging in with a social provider
  useEffect(() => {
    // query not set yet
    if (!!router.query.magic_credential) {
      router.query.provider ? finishSocialLogin() : finishEmailRedirectLogin();
    }
  }, [router.query]);

  // `getRedirectResult()` returns an object with user data from Magic and the social provider
  const finishSocialLogin = async () => {
    let result = await magic.oauth.getRedirectResult();
    authenticateWithServer(result.magic.idToken);
  };

  // `loginWithCredential()` returns a didToken for the user logging in
  const finishEmailRedirectLogin = () => {
    if (router.query.magic_credential)
      magic.auth
        .loginWithCredential()
        .then((didToken) => authenticateWithServer(didToken));
  };

  // Send token to server to validate
  const authenticateWithServer = async (didToken) => {
    let res = await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ didToken }),
    });

    if (res.status === 200) {
      const callbackResult = await fetch("/api/callback");
      const callbackData = await callbackResult.json();
      if (
        callbackData.callbackUrl &&
        !notAcceptedCallbackUrls.includes(callbackData.callbackUrl)
      ) {
        router.push(callbackData.callbackUrl);
      } else {
        router.push("/");
      }
    }
  };

  return (
    <>
      <Head>
        <title>Login</title>
        <meta name="description" content="Recipes Login Callback" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <PageSpinner />
      </main>
    </>
  );
};

Callback.layoutProps = {
  useContainer: true,
  includeNavAndFooter: false,
};

export default Callback;
