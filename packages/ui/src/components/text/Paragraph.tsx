import cn from "classnames";
import React from "react";

type Props = {
  id?: string;
  removeMarginBottom?: boolean;
  className?: string;
};

const Paragraph: React.FC<Props> = ({
  children,
  id,
  removeMarginBottom,
  className,
}) => (
  <p
    className={cn("prose dark:prose-dark max-w-full", className, {
      "mb-4": !removeMarginBottom,
    })}
    id={id}
  >
    {children}
  </p>
);

export default Paragraph;
