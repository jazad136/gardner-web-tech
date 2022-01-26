import { ReactElement } from "react";
import cn from "classnames";

export interface NavAlertProps {
  children: ReactElement | ReactElement[] | string;
  backgroundColor?: string;
}

export const NavAlert = ({
  children,
  backgroundColor = "bg-red-500",
}: NavAlertProps) => {
  return (
    <div
      className={cn(
        "w-full h-full p-2 text-center text-white",
        backgroundColor
      )}
    >
      {children}
    </div>
  );
};
