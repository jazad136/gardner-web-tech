import React from "react";
import { DateTime } from "luxon";

type Props = {
  projectName: string;
};

const Footer: React.FC<Props> = ({ projectName }: Props) => (
  <div className="relative block items-center">
    <div className="w-full px-2 py-3 footer flex flex-wrap">
      <div className="flex container prose dark:prose-dark prose-sm max-w-full justify-between">
        <div>{projectName}</div>
        <div>
          Created by Gardner Tech and web. &copy; {DateTime.local().year}
        </div>
      </div>
    </div>
  </div>
);

export default Footer;
