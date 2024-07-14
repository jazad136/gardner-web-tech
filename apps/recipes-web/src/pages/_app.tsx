import "regenerator-runtime/runtime";
import "react-toastify/dist/ReactToastify.css";
import "src/styles/globals.css";

import { NextComponentType } from "next";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "next-themes";
import { AppProps } from "next/app";
import NextNProgress from "nextjs-progressbar";
import { ToastContainer } from "react-toastify";
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

      <ToastContainer
        position="bottom-right"
        autoClose={6000}
        hideProgressBar={false}
        draggable={false}
        theme="colored"
        closeOnClick
        pauseOnHover
        pauseOnFocusLoss
      />
    </>
  );
};

export default MyApp;
