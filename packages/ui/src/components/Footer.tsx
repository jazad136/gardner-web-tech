import { DateTime } from "luxon";
import React from "react";

type Props = {
  projectName: string;
};

const Footer: React.FC<Props> = ({ projectName }: Props) => (
  <div className="relative block items-center justify-between">
    <div className="footer flex w-full flex-wrap px-2 py-3">
      <div className="container flex items-center justify-between">
        <div className="prose dark:prose-dark prose-sm ">{projectName}</div>
        <div className="prose dark:prose-dark prose-sm ">
          Created by Gardner Web and Tech. &copy; {DateTime.local().year}
        </div>
      </div>
    </div>
  </div>
);

export default Footer;
