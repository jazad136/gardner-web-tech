import * as React from "react";
import { ReactElement } from "react";
import cn from "classnames";

export interface NavbarWrapperProps {
  children: ReactElement | ReactElement[];
  removeMarginBottom?: boolean;
  sticky?: boolean;
}

export const NavbarWrapper = ({
  children,
  removeMarginBottom = false,
  sticky = false,
}: NavbarWrapperProps) => {
  return (
    <nav className="relative block items-center justify-between 2xl:mb-10">
      <div
        className={cn("w-full px-2 py-3 z-50 nav", {
          "fixed top-0 left-0 right-0": sticky,
          "flex flex-wrap": !sticky,
          "lg:mb-6 mb-4": !removeMarginBottom,
        })}
      >
        <div className="container flex items-center justify-between nav-container">
          {children}
        </div>
      </div>
    </nav>
  );
};
