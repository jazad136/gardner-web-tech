import Meta from "@components/meta";
import { Navbar } from "ui/nav";
import { ReactElement } from "react";

interface LayoutProps {
  preview: boolean;
  children: ReactElement | ReactElement[];
}

const Layout = ({ preview, children }: LayoutProps) => {
  return (
    <>
      <Meta />
      <div className="flex flex-col min-h-screen">
        <Navbar
          brandText="Gardner Web and Tech"
          alertText="Preview Mode"
          displayAlert={preview}
          navLinks={[]}
        />
        <main className="container flex-grow">{children}</main>
        {/* <Footer /> */}
      </div>
    </>
  );
};

export default Layout;
