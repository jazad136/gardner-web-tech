import { ReactElement } from "react";
import cn from "classnames";

export interface AccordionSectionHeaderProps {
  children: ReactElement | ReactElement[];
  id: string;
  toggle: () => void;
  bodyOpen: boolean;
}

export const AccordionSectionHeader = ({
  children,
  id,
  toggle,
  bodyOpen,
}: AccordionSectionHeaderProps) => (
  <h2 className="mb-0" id={`heading${id}`}>
    <button
      className={cn(
        "relative flex items-center w-full py-4 px-5 text-left border-0 rounded-none focus:outline-none",
        {
          "border-b": bodyOpen,
        }
      )}
      type="button"
      onClick={toggle}
    >
      {children}
    </button>
  </h2>
);
