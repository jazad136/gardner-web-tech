import React from "react";
import { styled } from "@stitches/react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";

const StyledItem = styled(AccordionPrimitive.Item, {
  overflow: "hidden",
  marginTop: 1,

  "&:first-child": {
    marginTop: 0,
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
  },

  "&:last-child": {
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 4,
  },

  "&:focus-within": {
    position: "relative",
    zIndex: 1,
    boxShadow: `0 0 0 2px`,
  },
});

const AccordionSection = StyledItem;

export default AccordionSection;
