import cn from "classnames";
import React from "react";

export type NavbarWrapperProps = {
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
      className={cn("nav z-50 w-full px-2 py-3", {
        "fixed top-0 left-0 right-0": sticky,
        "flex flex-wrap": !sticky,
        "mb-4 lg:mb-6": !removeMarginBottom,
      })}
    >
      <div className="container flex items-center justify-between">
        {children}
      </div>
    </div>
  </nav>
);

export default NavbarWrapper;
