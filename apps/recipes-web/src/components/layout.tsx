import cn from "classnames";
import Meta from "src/components/meta";
import { Footer } from "ui";

import Navbar from "./Navbar";

type Props = {
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
      <div className="flex min-h-screen flex-col">
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
