import { ReactElement } from "react";
import Meta from "src/components/meta";
import Navbar from "./Navbar";
import cn from "classnames";
import Footer from "ui/Footer";

interface LayoutProps {
  useContainer?: boolean;
  includeNavAndFooter: boolean;
  children: ReactElement | ReactElement[];
}

const Layout = ({
  children,
  includeNavAndFooter = true,
  useContainer = true,
}: LayoutProps) => {
  return (
    <>
      <Meta />
      <div className="flex flex-col min-h-screen">
        {includeNavAndFooter && <Navbar />}
        <main className={cn({ "container flex-grow": useContainer })}>
          {children}
        </main>
        {includeNavAndFooter && <Footer projectName="Recipes" />}
      </div>
    </>
  );
};

export default Layout;
