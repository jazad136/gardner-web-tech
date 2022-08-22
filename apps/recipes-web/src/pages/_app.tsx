import "regenerator-runtime/runtime";
import "src/styles/globals.css";

import { NextComponentType } from "next";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "next-themes";
import { AppProps } from "next/app";
import NextNProgress from "nextjs-progressbar";
import { Layout } from "src/components";
import { RecipeProvider } from "src/context/RecipeContext";
import { LayoutProps } from "src/types";

type CustomAppProps = AppProps & {
  Component: NextComponentType & { layout?: LayoutProps };
};

const MyApp: React.FC<CustomAppProps> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <>
      <NextNProgress />
      <ThemeProvider attribute="class">
        <SessionProvider session={session}>
          <RecipeProvider>
            <Layout
              includeContainer={Component.layout?.includeContainer}
              includeNavAndFooter={Component.layout?.includeNavAndFooter}
            >
              <Component {...pageProps} />
            </Layout>
          </RecipeProvider>
        </SessionProvider>
      </ThemeProvider>
    </>
  );
};

export default MyApp;
