import { ReactElement } from "react";
import Meta from "@components/meta";
import Navbar from "./Navbar";
import cn from "classnames";
import { PageSpinner } from "ui";
import { useLoadingContext } from "src/lib/LoadingContext";

interface LayoutProps {
  useContainer?: boolean;
  children: ReactElement | ReactElement[];
}

const Layout = ({ children, useContainer = true }: LayoutProps) => {
  const { loading } = useLoadingContext();

  return (
    <>
      <Meta />
      <div className="flex flex-col min-h-screen">
        <Navbar />
        {loading && <PageSpinner />}
        <main className={cn({ "container flex-grow": useContainer })}>
          {children}
        </main>
        {/* <Footer /> */}
      </div>
    </>
  );
};

export default Layout;
