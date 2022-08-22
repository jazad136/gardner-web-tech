import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";
import AuthTextWrapper from "src/components/AuthTextWrapper";
import { CustomNextPage } from "src/types/CustomNextPage";
import { Paragraph, Spinner } from "ui";

const ErrorPage: CustomNextPage = () => {
  const router = useRouter();

  useEffect(() => {
    const sleep = async (ms: number) => {
      return new Promise((resolve) => setTimeout(resolve, ms));
    };

    sleep(7000).then(() => {
      router.push("/auth/login");
    });
  }, [router]);

  return (
    <>
      <Head>
        <title>Email Verify</title>
        <meta name="description" content="Recipes Email Verification" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        {
          <AuthTextWrapper title="Error" titleSize="text-4xl">
            <Paragraph className="prose-lg">
              {!!router?.query && router.query.error === "AccessDenied" ? (
                <>
                  <div>You do not have access to this application</div>
                  <div>This application is an invitation-only application</div>
                  <div>
                    If you believe you should have access to this application,
                    please email the application&apos;s administrator.
                  </div>
                  <br />
                  <div>You are being redirected.</div>
                  <div>Please wait...</div>
                </>
              ) : (
                <>
                  <div>We ran into an error!</div>
                  <div>You are being redirected.</div>
                  <div>Please wait...</div>
                </>
              )}
            </Paragraph>
            <div className="mx-auto mt-4">
              <Spinner />
            </div>
          </AuthTextWrapper>
        }
      </main>
    </>
  );
};

ErrorPage.layout = {
  includeContainer: true,
  includeNavAndFooter: false,
};

export default ErrorPage;
