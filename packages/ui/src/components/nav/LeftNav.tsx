import cn from "classnames";
import React from "react";

import ThemeToggle from "../ThemeToggle";
import MenuToggle from "./MenuToggle";
import { NavbarLinkProps } from "./NavbarLink";
import NavbarLinks from "./NavbarLinks";

type Props = {
  isOpen: boolean;
  setNavbarOpen(isOpen: boolean): void;
  links?: NavbarLinkProps[];
  brandText: string;
  alwaysOpen?: boolean;
};

const LeftNav: React.FC<Props> = ({
  children,
  links,
  brandText,
  setNavbarOpen,
  alwaysOpen = false,
}) => (
  <nav className="nav flex h-full min-h-screen">
    <div className="custom-border-color w-64 border-r">
      <div className="custom-border-color mx-5 flex items-center justify-between border-b py-4">
        <div className="font-semibold uppercase">{brandText}</div>
        {!alwaysOpen && setNavbarOpen && (
          <div className="h-4">
            <MenuToggle toggle={() => setNavbarOpen(false)} />
          </div>
        )}
      </div>
      <div className="mx-5">
        <div className="pt-4">
          <ThemeToggle id="MainThemeToggle" />
        </div>
        {links && (
          <div
            className={cn("py-2", {
              "custom-border-color border-b": children,
            })}
          >
            <NavbarLinks links={links} isCol removeRightMargins />
          </div>
        )}
        {children && <div className="py-2">{children}</div>}
      </div>
    </div>
  </nav>
);

export default LeftNav;
