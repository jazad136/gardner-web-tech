import React from "react";
import cn from "classnames";

type Props = {
  children: string | JSX.Element | JSX.Element[];
  classNames?: string;
};

const Subtitle: React.FC<Props> = ({ children, classNames }) => (
  <p
    className={cn(
      "prose dark:prose-dark text-lg opacity-40 font-semibold mb-4",
      classNames
    )}
  >
    {children}
  </p>
);

export default Subtitle;
