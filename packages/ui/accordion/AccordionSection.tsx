import { ReactElement } from "react";

export interface AccordionSectionProps {
  children: ReactElement[];
}

export const AccordionSection = ({ children }: AccordionSectionProps) => (
  <div className="accordion-item border border-gray-200">{children}</div>
);
