import cn from "classnames";
import React from "react";

type Props = {
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
    "prose-xl": size === "xl",
    "prose-lg": size === "lg",
    "prose-base": size === "md",
    "prose-sm": size === "sm",
    "prose-xs": size === "xs",
  });

  return (
    <button
      className={cn(
        "prose dark:prose-dark my-1 mx-1 hover:cursor-pointer",
        sizeClasses,
        {
          "font-bold": isBold,
          "font-semibold": !isBold,
          "rounded-full": isPill,
          rounded: !isPill,
          [`btn-outline-${color}`]: isOutline,
          [`btn-bg-${color}`]: !isOutline,
          "btn-hover": !isDisabled,
          "opacity-50": isDisabled,
        }
      )}
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
