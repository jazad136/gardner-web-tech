import Meta from "@components/meta";
import { NavbarLinkProps, SimpleNavbar } from "ui/nav";
import { ReactElement } from "react";

interface LayoutProps {
  preview: boolean;
  children: ReactElement | ReactElement[];
}

const Layout = ({ preview, children }: LayoutProps) => {
  // const [navbarOpen, setNavbarOpen] = useState(false);

  const links: NavbarLinkProps[] = [
    {
      href: "/",
      text: "Link",
      display: true,
    },
    {
      href: "/",
      text: "Link2",
      display: true,
    },
  ];

  return (
    <>
      <Meta />
      <div className="flex flex-col min-h-screen">
        <SimpleNavbar brandText="Gardner Web and Tech" navLinks={links} />
        <main className="container flex-grow">{children}</main>
        {/* <Footer /> */}
      </div>
    </>
  );
};

export default Layout;
