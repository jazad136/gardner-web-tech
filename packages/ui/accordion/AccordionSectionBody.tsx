import React from "react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { keyframes, styled } from "@stitches/react";

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

type Props = {
  children: JSX.Element | JSX.Element[];
  props?: AccordionPrimitive.AccordionContentProps;
};

const AccordionSectionBody: React.FC<Props> = ({ children, ...props }) => (
  <StyledContent
    {...props}
    className="prose dark:prose-dark max-w-full overflow-hidden py-4"
  >
    <StyledContentText>{children}</StyledContentText>
  </StyledContent>
);

export default AccordionSectionBody;
