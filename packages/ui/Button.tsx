import React from "react";
import { ReactElement } from "react";
import cn from "classnames";

export interface ButtonProps {
  children: string | ReactElement | ReactElement[];
  color:
    | "success"
    | "primary"
    | "secondary"
    | "danger"
    | "light"
    | "white"
    | "dark";
  size: "xl" | "lg" | "md" | "sm" | "xs";
  onClick?: (value: any) => void;
  isBold?: boolean;
  isPill?: boolean;
  isOutline?: boolean;
  isDisabled?: boolean;
}

export const Button = ({
  children,
  color,
  size,
  onClick = () => {},
  isBold = true,
  isPill = false,
  isOutline = false,
  isDisabled = false,
}: ButtonProps) => {
  const sizeClasses = cn("py-1.5 px-4", {
    "text-xl": size === "xl",
    "text-lg": size === "lg",
    "text-md": size === "md",
    "text-sm": size === "sm",
    "text-xs": size === "xs",
  });

  return (
    <button
      className={cn("my-1 mx-1 hover:cursor-pointer", sizeClasses, {
        "font-bold": isBold,
        "rounded-full": isPill,
        rounded: !isPill,
        [`btn-outline-${color}`]: isOutline,
        [`btn-bg-${color}`]: !isOutline,
        "btn-hover": !isDisabled,
        "opacity-50": isDisabled,
      })}
      disabled={isDisabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
