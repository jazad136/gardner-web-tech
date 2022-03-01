import { ReactElement, useContext } from "react";
import Meta from "src/components/meta";
import Navbar from "./Navbar";
import cn from "classnames";

interface LayoutProps {
  useContainer?: boolean;
  includeNavbar: boolean;
  children: ReactElement | ReactElement[];
}

const Layout = ({
  children,
  includeNavbar,
  useContainer = true,
}: LayoutProps) => {
  return (
    <>
      <Meta />
      <div className="flex flex-col min-h-screen">
        {includeNavbar && <Navbar />}
        <main className={cn({ "container flex-grow": useContainer })}>
          {children}
        </main>
        {/* <Footer /> */}
      </div>
    </>
  );
};

export default Layout;
