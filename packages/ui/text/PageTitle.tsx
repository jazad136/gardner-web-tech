import cn from "classnames";

export interface PageTitleProps {
  children: string;
  classNames?: string;
}

export const PageTitle = ({ children, classNames }: PageTitleProps) => (
  <h1
    className={cn(
      "prose dark:prose-dark text-4xl font-bold mb-4 capitalize",
      classNames
    )}
  >
    {children}
  </h1>
);
