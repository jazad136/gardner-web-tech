import "../../styles/globals.css";
import { NextComponentType, NextPageContext } from "next";
import { ThemeProvider } from "next-themes";
import { RecipeProvider } from "src/lib/RecipeContext";
import Layout from "src/components/layout";
import NextNProgress from "nextjs-progressbar";
import "regenerator-runtime/runtime";

export type LayoutProps = {
  useContainer?: boolean;
  includeNavbar?: boolean;
};

type AppProps = {
  pageProps: any;
  Component: NextComponentType<NextPageContext, any, {}> & {
    layoutProps?: LayoutProps;
  };
};

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <NextNProgress />
      <ThemeProvider attribute="class">
        <RecipeProvider>
          <Layout
            useContainer={Component.layoutProps?.useContainer}
            includeNavbar={Component.layoutProps?.includeNavbar}
          >
            <Component {...pageProps} />
          </Layout>
        </RecipeProvider>
      </ThemeProvider>
    </>
  );
};

export default MyApp;
