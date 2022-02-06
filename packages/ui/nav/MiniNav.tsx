import React from "react";
import { motion, Variants } from "framer-motion";
import cn from "classnames";
import ThemeToggle from "../ThemeToggle";
import { NavbarLinkProps } from "./NavbarLink";
import { NavbarLinks } from "./NavbarLinks";

export interface MiniNavProps {
  isOpen: boolean;
  links: NavbarLinkProps[];
  sticky?: boolean;
  includeThemeToggle?: boolean;
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

export const MiniNav = ({
  isOpen,
  links,
  sticky = false,
  includeThemeToggle = false,
}: MiniNavProps) => (
  <motion.div
    initial={false}
    animate={isOpen ? "open" : "closed"}
    variants={subMenuAnimate}
  >
    <div className="flex py-2 nav px-6 w-full">
      <div
        className={cn("inline w-full", {
          "pt-4": sticky,
          "pt-2": !sticky,
          "pt-0": !includeThemeToggle,
        })}
      >
        {includeThemeToggle && (
          <div className="flex text-center">
            <div className="mr-2 prose dark:prose-dark text-primary lg:text-sm uppercase">
              Theme:
            </div>{" "}
            <div className="my-auto">
              <ThemeToggle isLarge={false} id="miniNavThemeToggle" />
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
