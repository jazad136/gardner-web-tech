import React from "react";
import { styled } from "@stitches/react";
import { FiChevronDown } from "react-icons/fi";
import * as AccordionPrimitive from "@radix-ui/react-accordion";

const StyledHeader = styled(AccordionPrimitive.Header, {
  '&[data-state="closed"]': { borderBottom: "none" },
  '&[data-state="open"]': {
    borderBottom: "solid 2px rgb(203 213 225 / var(--tw-border-opacity));",
  },
});

const StyledChevron = styled(FiChevronDown, {
  transition: "transform 300ms",
  "[data-state=open] &": { transform: "rotate(180deg)" },
});

interface AccordionSectionHeaderProps {
  children: React.ReactNode;
  props?: React.HTMLProps<HTMLButtonElement>;
}

const AccordionSectionHeader = ({
  children,
  ...props
}: AccordionSectionHeaderProps) => (
  <StyledHeader className="flex overflow-hidden py-4 px-5 text-left rounded-none border-b-slate-200 focus:outline-none">
    <AccordionPrimitive.Trigger
      {...props}
      className="flex relative items-center justify-between w-full "
      aria-hidden
    >
      {children}
      <StyledChevron
        aria-hidden
        className="text-black dark:text-white text-2xl"
      />
    </AccordionPrimitive.Trigger>
  </StyledHeader>
);

export default AccordionSectionHeader;
