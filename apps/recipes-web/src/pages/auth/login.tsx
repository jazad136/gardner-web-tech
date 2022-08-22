import { useSession } from "next-auth/react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import AuthTextWrapper from "src/components/AuthTextWrapper";
import EmailForm from "src/components/EmailForm";
import SocialLogins from "src/components/SocialLogins";
import { CustomNextPage } from "src/types/CustomNextPage";
import { PageSpinner } from "ui";

const LoginPage: CustomNextPage = () => {
  const { status } = useSession();
  const [disabled, setDisabled] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleLoggedIn = async () => {
      if (status === "authenticated") {
        const callbackUrl = router.query["callbackUrl"] as string | null;
        if (callbackUrl) {
          router.push(callbackUrl);
        }
        router.push("/");
      }
    };

    handleLoggedIn();
  }, [status, router]);

  return (
    <>
      <Head>
        <title>Login</title>
        <meta name="description" content="Recipes Login" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        {status === "loading" || status === "authenticated" ? (
          <PageSpinner />
        ) : (
          <AuthTextWrapper title="Login" titleSize="text-2xl">
            <EmailForm isDisabled={disabled} setIsDisabled={setDisabled} />
            <SocialLogins isDisabled={disabled} setIsDisabled={setDisabled} />
          </AuthTextWrapper>
        )}
      </main>
    </>
  );
};

LoginPage.layout = {
  includeContainer: true,
  includeNavAndFooter: false,
};

export default LoginPage;
