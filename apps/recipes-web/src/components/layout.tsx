import Meta from "src/components/meta";
import Navbar from "./Navbar";
import cn from "classnames";
import Footer from "ui/Footer";

type Props = {
  children: JSX.Element;
  includeContainer?: boolean;
  includeNavAndFooter?: boolean;
};

const Layout: React.FC<Props> = ({
  children,
  includeNavAndFooter = true,
  includeContainer = true,
}) => {
  return (
    <>
      <Meta />
      <div className="flex flex-col min-h-screen">
        {includeNavAndFooter && <Navbar />}
        <main className={cn({ "container flex-grow": includeContainer })}>
          {children}
        </main>
        {includeNavAndFooter && <Footer projectName="Recipes" />}
      </div>
    </>
  );
};

export default Layout;
