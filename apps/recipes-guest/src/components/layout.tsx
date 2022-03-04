import { ReactElement, useCallback, useEffect } from "react";
import Meta from "src/components/meta";
import Navbar from "./Navbar";
import cn from "classnames";
import Footer from "ui/Footer";

interface LayoutProps {
  useContainer?: boolean;
  children: ReactElement | ReactElement[];
}

const Layout = ({ children, useContainer = true }: LayoutProps) => (
  <>
    <Meta />
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className={cn({ "container flex-grow": useContainer })}>
        {children}
      </main>
      <Footer projectName="Recipes" />
    </div>
  </>
);

export default Layout;
