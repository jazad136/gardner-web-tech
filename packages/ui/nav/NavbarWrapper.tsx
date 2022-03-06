import React from "react";
import cn from "classnames";

export type NavbarWrapperProps = {
  children: JSX.Element | JSX.Element[];
  removeMarginBottom?: boolean;
  sticky?: boolean;
};

const NavbarWrapper: React.FC<NavbarWrapperProps> = ({
  children,
  removeMarginBottom = false,
  sticky = false,
}) => (
  <nav
    className={cn("relative block items-center justify-between", {
      "2xl:mb-10": !removeMarginBottom,
    })}
  >
    <div
      className={cn("w-full px-2 py-3 z-50 nav", {
        "fixed top-0 left-0 right-0": sticky,
        "flex flex-wrap": !sticky,
        "lg:mb-6 mb-4": !removeMarginBottom,
      })}
    >
      <div className="container flex items-center justify-between">
        {children}
      </div>
    </div>
  </nav>
);

export default NavbarWrapper;
