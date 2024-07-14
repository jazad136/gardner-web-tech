import cn from "classnames";
import Meta from "src/components/meta";
import { Footer } from "ui";

import Navbar from "./Navbar";

type Props = {
  includeContainer?: boolean;
};

const Layout: React.FC<Props> = ({
  children,
  includeContainer: useContainer = true,
}) => (
  <>
    <Meta />
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className={cn({ "container flex-grow": useContainer })}>
        {children}
      </main>
      <Footer projectName="Recipes" />
    </div>
  </>
);

export default Layout;
