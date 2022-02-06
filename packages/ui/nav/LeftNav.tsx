import React from "react";
import { ReactElement } from "react";
import { MenuToggle } from "./MenuToggle";
import { NavbarLinkProps } from "./NavbarLink";
import { NavbarLinks } from "./NavbarLinks";
import cn from "classnames";
import ThemeToggle from "../ThemeToggle";

export interface LeftNavProps {
  children: ReactElement | ReactElement[];
  isOpen: boolean;
  setNavbarOpen(isOpen: boolean): void;
  links?: NavbarLinkProps[];
  brandText: string;
  alwaysOpen?: boolean;
}

export const LeftNav = ({
  children,
  links,
  brandText,
  setNavbarOpen,
  alwaysOpen = false,
}: LeftNavProps) => {
  return (
    <nav className="flex h-full min-h-screen nav">
      <div className="w-64 border-r custom-border-color">
        <div className="flex justify-between items-center border-b custom-border-color mx-5 py-4">
          <div className="uppercase font-semibold">{brandText}</div>
          {!alwaysOpen && setNavbarOpen && (
            <div className="h-4">
              <MenuToggle toggle={() => setNavbarOpen(false)} />
            </div>
          )}
        </div>
        <div className="mx-5">
          <div className="pt-4">
            <ThemeToggle isLarge={false} id="MainThemeToggle" center={false} />
          </div>
          {links && (
            <div
              className={cn("py-2", {
                "border-b custom-border-color": children,
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
};
