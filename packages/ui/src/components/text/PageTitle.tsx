import cn from "classnames";

type Props = {
  className?: string;
};

const PageTitle: React.FC<Props> = ({ children, className }) => (
  <h1 className={cn("prose dark:prose-dark text-4xl mb-4", className)}>
    {children}
  </h1>
);

export default PageTitle;
