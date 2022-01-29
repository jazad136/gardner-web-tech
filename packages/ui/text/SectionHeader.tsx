import cn from "classnames";
import { ReactElement } from "react";

export interface SectionHeaderProps {
  children: ReactElement | ReactElement[] | string;
  classNames?: string;
}

export const SectionHeader = ({ children, classNames }: SectionHeaderProps) => (
  <h3
    className={cn(
      "prose dark:prose-dark mb-4 text-2xl font-semibold",
      classNames
    )}
  >
    {children}
  </h3>
);
