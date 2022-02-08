import { ReactElement, useCallback, useEffect, useMemo } from "react";
import Meta from "@components/meta";
import Navbar from "./Navbar";
import cn from "classnames";

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
      {/* <Footer /> */}
    </div>
  </>
);

export default Layout;
