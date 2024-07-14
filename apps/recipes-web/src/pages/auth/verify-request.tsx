import { useSession } from "next-auth/react";
import Head from "next/head";
import { useEffect } from "react";
import AuthTextWrapper from "src/components/AuthTextWrapper";
import { CustomNextPage } from "src/types/CustomNextPage";

const VerifyRequest: CustomNextPage = () => {
  const { status } = useSession();

  useEffect(() => {
    status === "authenticated" && window && window.close();
  }, [status]);

  return (
    <>
      <Head>
        <title>Email Verify</title>
        <meta name="description" content="Recipes Email Verification" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <AuthTextWrapper title="Check Your Email" titleSize="text-4xl">
          <div>We have sent you an email notification. </div>
          <div>Look for an email from</div>
          <div>
            <a
              href="mailto:info@gardnerwebtech.com"
              className="font-light no-underline hover:underline dark:text-stone-400"
              target="_blank"
              rel="noreferrer noopener"
            >
              info@gardnerwebtech.com.
            </a>
          </div>
        </AuthTextWrapper>
      </main>
    </>
  );
};

VerifyRequest.layout = {
  includeContainer: true,
  includeNavAndFooter: false,
};

export default VerifyRequest;
