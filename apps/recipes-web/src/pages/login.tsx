import { getSession } from "next-auth/react";
import { useRouter } from "next/router";
import Script from "next/script";
import { useEffect } from "react";

const Login = () => {
  const { query } = useRouter();

  useEffect(() => {
    if (query?.callbackUrl) {
      fetch("/api/auth/callback", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ callbackUrl: query.callbackUrl }),
      });
    }
  }, [query]);

  return (
    <Script
      strategy="lazyOnload"
      src="https://auth.magic.link/pnp/login"
      data-magic-publishable-api-key={
        process.env.NEXT_PUBLIC_MAGIC_PUBLISHABLE_KEY
      }
      data-redirect-uri="/callback"
    ></Script>
  );
};

export async function getServerSideProps(ctx) {
  const session = await getSession(ctx);

  if (session?.user) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
}

export default Login;
