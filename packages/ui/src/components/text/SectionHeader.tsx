import cn from "classnames";
import React from "react";

type Props = {
  className?: string;
  removeMarginBottom?: boolean;
};

const SectionHeader: React.FC<Props> = ({
  children,
  className,
  removeMarginBottom = false,
}) => (
  <h2
    className={cn(
      "prose dark:prose-dark text-2xl max-w-full font-semibold",
      className,
      {
        "mb-4": !removeMarginBottom,
      }
    )}
  >
    {children}
  </h2>
);

export default SectionHeader;
