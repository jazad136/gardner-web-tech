import React from "react";
import { keyframes, styled } from "@stitches/react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";

const StyledContentText = styled("div", {
  padding: "py-4 px-5",
});

const open = keyframes({
  from: { height: 0 },
  to: { height: "var(--radix-accordion-content-height)" },
});

const close = keyframes({
  from: { height: "var(--radix-accordion-content-height)" },
  to: { height: 0 },
});

const StyledContent = styled(AccordionPrimitive.Content, {
  '&[data-state="open"]': {
    animation: `${open} 300ms ease-out`,
  },
  '&[data-state="closed"]': {
    animation: `${close} 300ms ease-out`,
  },
});

interface AccordionSectionBodyProps {
  children: React.ReactNode;
  props?: AccordionPrimitive.AccordionContentProps;
}

const AccordionSectionBody = ({
  children,
  ...props
}: AccordionSectionBodyProps) => (
  <StyledContent
    {...props}
    className="prose dark:prose-dark max-w-full overflow-hidden py-4"
  >
    <StyledContentText>{children}</StyledContentText>
  </StyledContent>
);

export default AccordionSectionBody;
