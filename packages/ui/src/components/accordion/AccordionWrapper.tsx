import React from "react";

import * as AccordionPrimitive from "@radix-ui/react-accordion";

type Props = {
  value: string;
  onValueChange?(value: string): void;
};

const AccordionWrapper: React.FC<Props> = ({
  children,
  value,
  onValueChange,
}) => (
  <AccordionPrimitive.Root
    type="single"
    className="border border-slate-300 rounded-2xl my-6 focus-within:outline-none"
    value={value}
    collapsible
    onValueChange={onValueChange}
  >
    {children}
  </AccordionPrimitive.Root>
);

export default AccordionWrapper;
