import cn from "classnames";

type Props = {
  children: string;
  classNames?: string;
};

const PageTitle: React.FC<Props> = ({ children, classNames }: Props) => (
  <h1 className={cn("prose dark:prose-dark text-4xl mb-4", classNames)}>
    {children}
  </h1>
);

export default PageTitle;
