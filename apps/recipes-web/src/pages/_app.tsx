import "../../styles/globals.css";
import { NextComponentType, NextPage } from "next";
import { AppProps } from "next/app";
import Layout from "src/components/layout";
import { RecipeProvider } from "src/lib/RecipeContext";
import { LayoutProps } from "src/lib/LayoutProps";
import { ThemeProvider } from "next-themes";
import NextNProgress from "nextjs-progressbar";
import "regenerator-runtime/runtime";

type CustomAppProps = AppProps & {
  Component: NextComponentType & { layout?: LayoutProps };
};

const MyApp: React.FC<CustomAppProps> = ({ Component, pageProps }) => {
  return (
    <>
      <NextNProgress />
      <ThemeProvider attribute="class">
        <RecipeProvider>
          <Layout
            includeContainer={Component.layout?.includeContainer}
            includeNavAndFooter={Component.layout?.includeNavAndFooter}
          >
            <Component {...pageProps} />
          </Layout>
        </RecipeProvider>
      </ThemeProvider>
    </>
  );
};

export default MyApp;
