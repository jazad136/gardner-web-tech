import cn from "classnames";
import { motion, Variants } from "framer-motion";
import React from "react";

import ThemeToggle from "../ThemeToggle";
import { NavbarLinkProps } from "./NavbarLink";
import NavbarLinks from "./NavbarLinks";

type Props = {
  isOpen: boolean;
  links: NavbarLinkProps[];
  sticky?: boolean;
  includeThemeToggle?: boolean;
};

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

const MiniNav: React.FC<Props> = ({
  isOpen,
  links,
  sticky = false,
  includeThemeToggle = false,
}) => (
  <motion.div
    initial={false}
    animate={isOpen ? "open" : "closed"}
    variants={subMenuAnimate}
  >
    <div className="nav flex w-full py-2 px-6">
      <div
        className={cn("inline w-full", {
          "pt-4": sticky,
          "pt-2": !sticky,
          "pt-0": !includeThemeToggle,
        })}
      >
        {includeThemeToggle && (
          <div className="flex text-center">
            <div className="prose dark:prose-dark text-primary mr-2 uppercase lg:text-sm">
              Theme:
            </div>{" "}
            <div className="my-auto">
              <ThemeToggle id="miniNavThemeToggle" />
            </div>
          </div>
        )}
        <hr />
        <div className="justify-center">
          <NavbarLinks links={links} removeRightMargins />
        </div>
      </div>
    </div>
  </motion.div>
);

export default MiniNav;
