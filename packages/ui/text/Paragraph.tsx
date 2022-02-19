import { ReactElement } from "react";
import cn from "classnames";

export interface ParagraphProps {
  children: ReactElement | ReactElement[] | string;
  removeMarginBottom?: boolean;
  classNames?: string;
}

export const Paragraph = ({
  children,
  removeMarginBottom,
  classNames,
}: ParagraphProps) => (
  <p
    className={cn("prose dark:prose-dark", classNames, {
      "mb-4": !removeMarginBottom,
    })}
  >
    {children}
  </p>
);
