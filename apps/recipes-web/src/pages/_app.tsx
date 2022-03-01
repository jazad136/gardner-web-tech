import "../../styles/globals.css";
import { NextComponentType, NextPageContext } from "next";
import { ThemeProvider } from "next-themes";
import { RecipeProvider } from "src/lib/RecipeContext";
import Layout from "src/components/layout";
import NextNProgress from "nextjs-progressbar";
import "regenerator-runtime/runtime";
import { useContext, useEffect, useState } from "react";
import { Session, UserContext } from "src/lib/UserContext";
import { magic } from "src/lib/magic";
import { PageSpinner } from "ui";
import Logout from "src/components/Logout";

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
  const [session, setSession] = useState<Session>({ isLoading: false });

  // If isLoggedIn is true, set the UserContext with user data
  // Otherwise, redirect to /login and set UserContext to { user: null }
  useEffect(() => {
    setSession({ isLoading: true });
    try {
      magic.user.isLoggedIn().then((isLoggedIn) => {
        if (isLoggedIn) {
          magic.user
            .getMetadata()
            .then((userData) =>
              setSession({ isLoading: false, user: userData })
            );
        } else {
          setSession({ user: null, isLoading: false });
        }
      });
    } catch {
      setSession({ isLoading: false });
    }
  }, []);

  return (
    <>
      <NextNProgress />
      <ThemeProvider attribute="class">
        <UserContext.Provider value={{ session, setSession }}>
          {Component.auth ? (
            <Auth>
              <RecipeProvider>
                <Layout
                  useContainer={Component.layoutProps?.useContainer}
                  includeNavbar={true}
                >
                  <Component {...pageProps} />
                </Layout>
              </RecipeProvider>
            </Auth>
          ) : (
            <Layout useContainer={true} includeNavbar={false}>
              <Component {...pageProps} />
            </Layout>
          )}
        </UserContext.Provider>
      </ThemeProvider>
    </>
  );
};

interface AuthProps {
  children: JSX.Element;
}

const Auth = ({ children }: AuthProps) => {
  const { session } = useContext(UserContext);

  if (!!session?.user) {
    return <>{children}</>;
  }

  if (!!session && !session.user && !session.isLoading) {
    return <Logout />;
  }

  return <PageSpinner />;
};

export default MyApp;
