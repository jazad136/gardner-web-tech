import { ReactElement } from "react";

export interface AccordionSectionHeaderProps {
  children: string | ReactElement | ReactElement[];
  id: string;
  expanded?: boolean;
}

export const AccordionSectionHeader = ({
  children,
  id,
  expanded = false,
}: AccordionSectionHeaderProps) => (
  <h2 className="accordion-header mb-0" id={`heading${id}`}>
    <button
      className="
          accordion-button
          relative
          flex
          items-center
          w-full
          py-4
          px-5
          text-base
          text-left
          border-0
          rounded-none
          transition
          focus:outline-none"
      type="button"
      data-bs-toggle="collapse"
      data-bs-target={`#collapse${id}`}
      aria-expanded={expanded}
      aria-controls={`collapse${id}`}
    >
      {children}
    </button>
  </h2>
);
