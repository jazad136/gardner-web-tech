import cn from "classnames";
import React from "react";

type Props = {
  backgroundColor?: string;
};

const NavAlert: React.FC<Props> = ({
  children,
  backgroundColor = "bg-red-500",
}) => (
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
