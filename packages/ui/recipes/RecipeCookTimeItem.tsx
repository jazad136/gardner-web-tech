import { ReactElement } from "react";
import { DisplayTime } from "..";
import cn from "classnames";

export interface RecipeCookTimeItemProps {
  children: ReactElement | ReactElement[];
  title: string;
  time?: number;
  rest?: string;
  totalItems: number;
}

export const RecipeCookTimeItem = ({
  children,
  title,
  time = 0,
  rest = "",
  totalItems,
}: RecipeCookTimeItemProps) => {
  return (
    <li
      className={cn("block w-full ", {
        "md:w-1/2 lg:w-1/4": totalItems % 2 === 0,
        "md:w-1/3": totalItems % 2 !== 0,
      })}
    >
      {children}
      <div className="prose dark:prose-dark flex justify-center capitalize">
        {title}:{" "}
        <div className="flex justify-center ml-1 normal-case">
          {time > 0 ? (
            <DisplayTime minutes={time} />
          ) : (
            <span className="prose dark:prose-dark">{rest}</span>
          )}
        </div>
      </div>
    </li>
  );
};
