import React from "react";

import { Brand, MenuToggle } from "../nav";

type Props = {
  setExpanded: React.Dispatch<React.SetStateAction<boolean>>;
};

const RecipeSideNavHeader: React.FC<Props> = ({ setExpanded }) => (
  <div className="sticky top-0 z-50 mb-2 block border-b-2 border-solid bg-gray-100 py-2 dark:bg-gray-900">
    <div className="flex items-center justify-between">
      <Brand href="/">Recipes</Brand>
      <div className="px-2">
        <MenuToggle toggle={() => setExpanded(false)} />
      </div>
    </div>
  </div>
);

export default RecipeSideNavHeader;
