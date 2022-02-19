import React from "react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";

interface AccordionWrapperProps {
  children: React.ReactNode;
  defaultValue?: string;
  value?: string;
  onValueChange?(value: string): void;
}

const AccordionWrapper = ({
  children,
  defaultValue,
  value,
  onValueChange,
}: AccordionWrapperProps) => (
  <AccordionPrimitive.Root
    type="single"
    className="border border-slate-300 rounded-2xl my-6 focus-within:outline-none"
    value={value}
    defaultValue={defaultValue}
    collapsible
    onValueChange={onValueChange}
  >
    {children}
  </AccordionPrimitive.Root>
);

export default AccordionWrapper;
