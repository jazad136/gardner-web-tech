import cn from "classnames";
import React from "react";

import DisplayTime from "../DisplayTime";

type Props = {
  title: string;
  time?: number;
  rest?: string;
  totalItems: number;
};

const RecipeCookTimeItem: React.FC<Props> = ({
  children,
  title,
  time = 0,
  rest = "",
  totalItems,
}) => (
  <li
    className={cn("block w-full ", {
      "md:w-1/2 lg:w-1/4": totalItems % 2 === 0,
      "md:w-1/3": totalItems % 2 !== 0,
    })}
  >
    {children}
    <div className="prose dark:prose-dark flex justify-center capitalize">
      {title}:{" "}
      <div className="ml-1 flex justify-center normal-case">
        {time > 0 ? (
          <DisplayTime minutes={time} />
        ) : (
          <span className="prose dark:prose-dark">{rest}</span>
        )}
      </div>
    </div>
  </li>
);

export default RecipeCookTimeItem;
