import React from "react";
import cn from "classnames";

type NavAlertProps = {
  children: JSX.Element | JSX.Element[];
  backgroundColor?: string;
};

const NavAlert = ({
  children,
  backgroundColor = "bg-red-500",
}: NavAlertProps) => (
  <div
    className={cn(
      "w-full h-full p-2 text-center prose prose-dark",
      backgroundColor
    )}
  >
    {children}
  </div>
);

export default NavAlert;
