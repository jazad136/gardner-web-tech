import React from "react";
import cn from "classnames";

type Props = {
  children: string | JSX.Element | JSX.Element[];
  removeMarginBottom?: boolean;
  classNames?: string;
};

const Paragraph: React.FC<Props> = ({
  children,
  removeMarginBottom,
  classNames,
}) => (
  <p
    className={cn("prose dark:prose-dark max-w-full", classNames, {
      "mb-4": !removeMarginBottom,
    })}
  >
    {children}
  </p>
);

export default Paragraph;
