import { ReactElement } from "react";
import { motion } from "framer-motion";

export interface AccordionSectionProps {
  children: ReactElement[];
  bodyOpen: boolean;
}

export const AccordionSection = ({
  children,
  bodyOpen = false,
}: AccordionSectionProps) => (
  <motion.div initial={false} animate={bodyOpen ? "open" : "closed"}>
    {children}
  </motion.div>
);
