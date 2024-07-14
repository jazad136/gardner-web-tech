import cn from "classnames";
import React from "react";

type Props = {
  className?: string;
};

const Subtitle: React.FC<Props> = ({ children, className }) => (
  <p
    className={cn(
      "prose dark:prose-dark text-lg opacity-40 font-semibold mb-4",
      className
    )}
  >
    {children}
  </p>
);

export default Subtitle;
