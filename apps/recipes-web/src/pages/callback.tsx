import { useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { PageSpinner } from "ui";
import { CustomNextPage } from "src/lib/CustomNextPage";
import { magic } from "src/lib/magic";

const notAcceptedCallbackUrls = ["/login", "/callback"];

const CallbackPage: CustomNextPage = () => {
  const router = useRouter();

  useEffect(() => {
    if (!!router.query.magic_credential) {
      router.query.provider ? finishSocialLogin() : finishEmailRedirectLogin();
    }
  }, [router.query]);

  const finishSocialLogin = async () => {
    let result = await magic.oauth.getRedirectResult();
    authenticateWithServer(result.magic.idToken);
  };

  const finishEmailRedirectLogin = () => {
    if (router.query.magic_credential)
      magic.auth
        .loginWithCredential()
        .then((didToken) => authenticateWithServer(didToken));
  };

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

CallbackPage.layout = {
  includeContainer: true,
  includeNavAndFooter: false,
};

export default CallbackPage;
