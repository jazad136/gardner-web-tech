import { Footer } from "ui";

import Meta from "@components/meta";

interface LayoutProps {
  preview: boolean;
}

const Layout: React.FC<LayoutProps> = ({ preview, children }) => {
  // const [navbarOpen, setNavbarOpen] = useState(false);
  return (
    <>
      <Meta />
      <div className="flex min-h-screen flex-col">
        <main className="container flex-grow">{children}</main>
        <Footer projectName="Gardner Web and Tech" />
      </div>
    </>
  );
};

export default Layout;
