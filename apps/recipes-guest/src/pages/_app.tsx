import "src/styles/globals.css";
import "regenerator-runtime/runtime";

import { NextComponentType } from "next";
import { ThemeProvider } from "next-themes";
import { AppProps } from "next/app";
import NextNProgress from "nextjs-progressbar";
import Layout from "src/components/layout";
import { RecipeProvider } from "src/context/RecipeContext";
import { LayoutProps } from "src/types/LayoutProps";

type CustomAppProps = AppProps & {
  Component: NextComponentType & { layout: LayoutProps };
};

const MyApp: React.FC<CustomAppProps> = ({ Component, pageProps }) => {
  return (
    <>
      <NextNProgress />
      <RecipeProvider>
        <ThemeProvider attribute="class">
          <Layout includeContainer={Component.layout?.includeContainer}>
            <Component {...pageProps} />
          </Layout>
        </ThemeProvider>
      </RecipeProvider>
    </>
  );
};

export default MyApp;
