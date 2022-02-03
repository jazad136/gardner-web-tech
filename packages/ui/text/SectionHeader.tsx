import cn from "classnames";
import { ReactElement } from "react";

export interface SectionHeaderProps {
  children: ReactElement | ReactElement[] | string;
  classNames?: string;
  removeMarginBottom?: boolean;
}

export const SectionHeader = ({
  children,
  classNames,
  removeMarginBottom = false,
}: SectionHeaderProps) => (
  <h2
    className={cn(
      "prose dark:prose-dark text-2xl max-w-full font-semibold",
      classNames,
      {
        "mb-4": !removeMarginBottom,
      }
    )}
  >
    {children}
  </h2>
);
