import { signIn, useSession } from "next-auth/react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { EmailForm, SocialLogin } from "src/components";
import AuthTextWrapper from "src/components/AuthTextWrapper";
import { CustomNextPage } from "src/types/CustomNextPage";
import { PageSpinner } from "ui";

import EmailVerification from "../../components/EmailVerification";

const LoginPage: CustomNextPage = () => {
  const router = useRouter();
  const { status } = useSession();
  const [disabled, setDisabled] = useState(false);
  const [emailSent, setSendEmail] = useState(false);
  const callbackUrl = router.query["callbackUrl"];

  useEffect(() => {
    const handleLoggedIn = async () => {
      if (status === "authenticated") {
        if (typeof callbackUrl === "string") {
          router.push(callbackUrl);
        } else {
          router.push("/");
        }
      }
    };

    const handleAccountNotLinked = async () => {
      const error = router.query["error"] as string | null;

      if (!!error && error.startsWith("OAuthAccountNotLinked")) {
        toast.error(
          'Please select the login method you used previously. If you would like to use this account in the future, please click "Link Accounts" after you sign in.',
          {
            toastId: "OAuthAccountNotLinked",
            autoClose: 8000,
          }
        );
      }
    };

    handleLoggedIn();
    handleAccountNotLinked();
  }, [status, callbackUrl, router]);

  const handleEmailSent = async (email: string) => {
    setDisabled(true);
    await signIn("email", { email, redirect: false });
    setSendEmail(true);
  };

  return (
    <>
      <Head>
        <title>Login</title>
        <meta name="description" content="Recipes Login" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        {status === "loading" || status === "authenticated" || emailSent ? (
          <PageSpinner />
        ) : (
          <AuthTextWrapper title="Login" titleSize="text-2xl">
            <EmailForm isDisabled={disabled} handleSubmit={handleEmailSent} />

            <div className="prose prose-sm my-3 max-w-full text-center text-slate-500 dark:text-slate-300">
              Or login with
            </div>

            <SocialLogin
              isDisabled={disabled}
              setIsDisabled={setDisabled}
              callbackUrl={callbackUrl as string | null}
            />
          </AuthTextWrapper>
        )}
        <EmailVerification isOpen={emailSent} />
      </main>
    </>
  );
};

LoginPage.layout = {
  includeContainer: true,
  includeNavAndFooter: false,
};

export default LoginPage;
