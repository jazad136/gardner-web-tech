import React from "react";
import { FiChevronDown } from "react-icons/fi";

import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { styled } from "@stitches/react";

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

type Props = {
  handleOnClick: (input: any) => void;
  props?: React.HTMLProps<HTMLButtonElement>;
};

const AccordionSectionHeader: React.FC<Props> = ({
  children,
  handleOnClick,
  ...props
}) => (
  <StyledHeader
    className="flex overflow-hidden rounded-none border-b-slate-200 py-4 px-5 text-left focus:outline-none"
    asChild
  >
    <AccordionPrimitive.Trigger
      {...props}
      className="relative flex w-full items-center justify-between "
      onClick={handleOnClick}
    >
      {children}
      <StyledChevron
        aria-hidden
        className="text-2xl text-black dark:text-white"
      />
    </AccordionPrimitive.Trigger>
  </StyledHeader>
);

export default AccordionSectionHeader;
