import { motion, Variants } from "framer-motion";
import ThemeToggle from "../ThemeToggle";
import { NavbarLinkProps } from "./NavbarLink";
import { NavbarLinks } from "./NavbarLinks";
import cn from "classnames";

export interface MiniNavProps {
  isOpen: boolean;
  sticky?: boolean;
  links: NavbarLinkProps[];
}

const subMenuAnimate: Variants = {
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

export const MiniNav = ({ isOpen, links, sticky = false }: MiniNavProps) => (
  <motion.div
    initial={false}
    animate={isOpen ? "open" : "closed"}
    variants={subMenuAnimate}
  >
    <div className="flex py-2 nav">
      <div
        className={cn("inline", {
          "pt-4": sticky,
          "pt-2": !sticky,
        })}
      >
        <div className="flex text-center">
          <div className="mr-2 prose dark:prose-dark text-primary lg:text-sm uppercase ">
            Theme:
          </div>{" "}
          <div className="my-auto">
            <ThemeToggle isLarge={false} id="miniNavThemeToggle" />
          </div>
        </div>
        <NavbarLinks links={links} />
      </div>
    </div>
  </motion.div>
);
