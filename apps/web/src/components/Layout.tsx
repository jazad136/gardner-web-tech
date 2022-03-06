import Meta from "@components/meta";
import { ReactElement } from "react";

interface LayoutProps {
  preview: boolean;
  children: ReactElement | ReactElement[];
}

const Layout = ({ preview, children }: LayoutProps) => {
  // const [navbarOpen, setNavbarOpen] = useState(false);
  return (
    <>
      <Meta />
      <div className="flex flex-col min-h-screen">
        <main className="container flex-grow">{children}</main>
        {/* <Footer /> */}
      </div>
    </>
  );
};

export default Layout;
