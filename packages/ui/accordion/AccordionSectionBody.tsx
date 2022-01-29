import { ReactElement } from "react";

export interface AccordionSectionBodyProps {
  children: string | ReactElement | ReactElement[];
  id: string;
}

export const AccordionSectionBody = ({
  children,
  id,
}: AccordionSectionBodyProps) => (
  <div
    id={`collapse${id}`}
    className="accordion-collapse collapse show"
    aria-labelledby={`heading${id}`}
  >
    <div className="accordion-body py-4 px-5">{children}</div>
  </div>
);
