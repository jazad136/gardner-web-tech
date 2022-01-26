import cn from "classnames";
import { ReactElement } from "react";

export interface SubtitleProps {
  children: ReactElement | ReactElement[] | string;
  classNames?: string;
}

const Subtitle = ({ children, classNames }: SubtitleProps) => (
  <p className={cn("text-lg opacity-40 font-semibold mb-4", classNames)}>
    {children}
  </p>
);

export default Subtitle;
