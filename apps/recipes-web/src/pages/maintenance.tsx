import Head from "next/head";
import { MdConstruction } from "react-icons/md";
import { CustomNextPage } from "src/types";

const MaintenancePage: CustomNextPage = () => (
  <>
    <Head>
      <title>Recipes: Maintenance</title>
      <meta name="description" content="Recipes is down for maintenance" />
      <link rel="icon" href="/favicon.ico" />
    </Head>

    <main className="grid h-screen place-items-center">
      <div>
        <MdConstruction className="mx-auto mb-2" size="3em" />
        <p className="text-xl">
          The website is under maintenance. Please come back soon
        </p>
      </div>
    </main>
  </>
);

MaintenancePage.layout = {
  includeContainer: true,
  includeNavAndFooter: false,
};

export default MaintenancePage;
