import { CustomNextPage } from "../lib/CustomNextPage";
import { MdConstruction } from "react-icons/md";

const MaintenancePage: CustomNextPage = () => (
  <div className="grid h-screen place-items-center">
    <div>
      <MdConstruction className="mx-auto mb-2" size="3em" />
      <p className="text-xl">
        The website is under maintenance. Please come back soon
      </p>
    </div>
  </div>
);

MaintenancePage.layout = {
  includeContainer: true,
  includeNavAndFooter: false,
};

export default MaintenancePage;
