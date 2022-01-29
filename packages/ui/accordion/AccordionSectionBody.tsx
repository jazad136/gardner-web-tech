import { ReactElement } from "react";
import { motion, Variants } from "framer-motion";

export interface AccordionSectionBodyProps {
  children: string | ReactElement | ReactElement[];
  id: string;
  isOpen: boolean;
}

const bodyAnimate: Variants = {
  open: {
    opacity: 1,
    height: "auto",
    transition: {
      ease: "easeIn",
      duration: 0.2,
    },
  },
  closed: {
    height: 0,
    opacity: 0,
  },
};

export const AccordionSectionBody = ({
  children,
  id,
  isOpen,
}: AccordionSectionBodyProps) => {
  return (
    <motion.div
      id={`collapse${id}`}
      initial={isOpen}
      animate={isOpen ? "open" : "closed"}
      variants={bodyAnimate}
    >
      <div className="prose dark:prose-dark max-w-full py-4 px-5">
        {children}
      </div>
    </motion.div>
  );
};
