import "../../styles/globals.css";
import { NextComponentType, NextPageContext } from "next";
import { ThemeProvider } from "next-themes";
import { RecipeProvider } from "src/lib/RecipeContext";
import Layout from "src/components/layout";
import NextNProgress from "nextjs-progressbar";
import "regenerator-runtime/runtime";

export type LayoutProps = {
  useContainer?: boolean;
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
      <RecipeProvider>
        <ThemeProvider attribute="class">
          <Layout useContainer={Component.layoutProps?.useContainer}>
            <Component {...pageProps} />
          </Layout>
        </ThemeProvider>
      </RecipeProvider>
    </>
  );
};

export default MyApp;
