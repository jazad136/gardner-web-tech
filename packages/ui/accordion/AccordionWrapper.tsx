import { ReactElement } from "react";

export interface AccordionWrapperProps {
  children: ReactElement | ReactElement[];
  id: string;
}

export const AccordionWrapper = ({ children, id }: AccordionWrapperProps) => (
  <div className="accordion my-6" id={id}>
    {children}
  </div>
);
