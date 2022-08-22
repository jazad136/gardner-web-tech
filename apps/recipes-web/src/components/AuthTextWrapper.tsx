import cn from "classnames";
import { PageTitle } from "ui";

type Props = {
  title: string;
  titleSize: string;
};

const AuthTextWrapper: React.FC<Props> = ({ title, titleSize, children }) => (
  <div className="absolute top-1/2 left-1/2 w-[95vw] -translate-x-1/2 -translate-y-1/2 rounded-[20px] border border-stone-200 bg-stone-100 p-6 pb-8 text-center dark:border-2 dark:border-slate-700 dark:bg-slate-800 md:w-5/6 lg:w-1/2 xl:w-1/3 2xl:w-1/4">
    <PageTitle className={cn("text-center", titleSize)}>{title}</PageTitle>
    <div className="text-center text-xl">{children}</div>
  </div>
);

export default AuthTextWrapper;
