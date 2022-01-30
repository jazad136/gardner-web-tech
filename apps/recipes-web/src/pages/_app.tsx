import "../../styles/globals.css";
import { NextComponentType, NextPageContext } from "next";
import { ThemeProvider } from "next-themes";
import { RecipeProvider } from "src/lib/RecipeContext";
import Layout from "@components/layout";
import { LoadingProvider } from "src/lib/LoadingContext";
import { ReactElement, useEffect } from "react";
import { SessionProvider, signIn, useSession } from "next-auth/react";
import { PageSpinner } from "ui";

export type LayoutProps = {
  useContainer?: boolean;
};

type AppProps = {
  pageProps: any;
  Component: NextComponentType<NextPageContext, any, {}> & {
    layoutProps?: LayoutProps;
    auth: boolean;
  };
};

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <LoadingProvider>
      <ThemeProvider attribute="class">
        <SessionProvider session={pageProps.session} refetchInterval={5 * 60}>
          {Component.auth ? (
            <Auth>
              <RecipeProvider>
                <Layout useContainer={Component.layoutProps?.useContainer}>
                  <Component {...pageProps} />
                </Layout>
              </RecipeProvider>
            </Auth>
          ) : (
            <Layout useContainer={Component.layoutProps?.useContainer}>
              <Component {...pageProps} />
            </Layout>
          )}
        </SessionProvider>
      </ThemeProvider>
    </LoadingProvider>
  );
};

interface AuthProps {
  children: ReactElement | ReactElement[];
}

const Auth = ({ children }: AuthProps) => {
  const { data: session, status } = useSession();
  const isUser = !!session?.user;

  useEffect(() => {
    if (status === "loading") {
      return;
    }
    if (!isUser) {
      signIn();
    }
  }, [isUser, status]);

  if (isUser) {
    return <>{children}</>;
  }

  return <PageSpinner />;
};

export default MyApp;
