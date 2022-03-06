import React from "react";
import cn from "classnames";

type Props = {
  children: string | JSX.Element | JSX.Element[];
  color:
    | "success"
    | "primary"
    | "secondary"
    | "danger"
    | "light"
    | "white"
    | "dark"
    | "google"
    | "facebook";
  size: "xl" | "lg" | "md" | "sm" | "xs";
  ariaLabel: string;
  onClick?: (value: any) => void;
  isBold?: boolean;
  isPill?: boolean;
  isOutline?: boolean;
  isDisabled?: boolean;
  type?: "button" | "submit" | "reset";
};

const Button: React.FC<Props> = ({
  children,
  color,
  size,
  ariaLabel,
  onClick = () => {},
  isBold = true,
  isPill = false,
  isOutline = false,
  isDisabled = false,
  type = "button",
}) => {
  const sizeClasses = cn("py-1.5 px-4", {
    "text-xl": size === "xl",
    "text-lg": size === "lg",
    "text-sm": size === "sm",
    "text-xs": size === "xs",
  });

  return (
    <button
      className={cn("my-1 mx-1 hover:cursor-pointer", sizeClasses, {
        "font-bold": isBold,
        "font-semibold": !isBold,
        "rounded-full": isPill,
        rounded: !isPill,
        [`btn-outline-${color}`]: isOutline,
        [`btn-bg-${color}`]: !isOutline,
        "btn-hover": !isDisabled,
        "opacity-50": isDisabled,
      })}
      disabled={isDisabled}
      onClick={onClick}
      aria-label={ariaLabel}
      type={type}
    >
      {children}
    </button>
  );
};

export default Button;
