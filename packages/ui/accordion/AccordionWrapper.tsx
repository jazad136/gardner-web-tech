import { ReactElement } from "react";

export interface AccordionWrapperProps {
  children: ReactElement | ReactElement[];
  id: string;
}

export const AccordionWrapper = ({ children, id }: AccordionWrapperProps) => (
  <div className="border border-slate-300 rounded-2xl my-6" id={id}>
    {children}
  </div>
);
