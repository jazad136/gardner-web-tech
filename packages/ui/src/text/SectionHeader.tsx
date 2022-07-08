import React from "react";
import cn from "classnames";

type Props = {
  children: string | JSX.Element | JSX.Element[];
  classNames?: string;
  removeMarginBottom?: boolean;
};

const SectionHeader: React.FC<Props> = ({
  children,
  classNames,
  removeMarginBottom = false,
}) => (
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

export default SectionHeader;
