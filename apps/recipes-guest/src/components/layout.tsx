import Meta from "src/components/meta";
import Navbar from "./Navbar";
import cn from "classnames";
import Footer from "ui/src/Footer";

type Props = {
  includeContainer?: boolean;
  children: JSX.Element;
};

const Layout: React.FC<Props> = ({
  children,
  includeContainer: useContainer = true,
}) => (
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
