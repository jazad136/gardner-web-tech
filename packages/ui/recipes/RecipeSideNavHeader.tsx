import React from "react";
import { Brand, MenuToggle } from "..";

export interface RecipeSideNavHeaderProps {
  setExpanded: React.Dispatch<React.SetStateAction<boolean>>;
}

export const RecipeSideNavHeader = ({
  setExpanded,
}: RecipeSideNavHeaderProps) => (
  <div className="sticky top-0 mb-2 block z-50 bg-gray-100 dark:bg-gray-900 py-2 border-b-2 border-solid">
    <div className="flex justify-between items-center">
      <Brand href="/">Recipes</Brand>
      <div className="px-2">
        <MenuToggle toggle={() => setExpanded(false)} />
      </div>
    </div>
  </div>
);
