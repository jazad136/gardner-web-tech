import React from "react";
import { ReactElement, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { MenuToggle } from "./MenuToggle";
import { MiniNav } from "./MiniNav";
import { NavAlert } from "./NavAlert";
import { NavbarLinkProps } from "./NavbarLink";
import { NavbarLinks } from "./NavbarLinks";
import ThemeToggle from "../ThemeToggle";
import { NavbarWrapper } from "./NavbarWrapper";
import { Brand } from "./Brand";
import * as Pino from "pino";

const logger = Pino.default({ name: "SimpleNavbar" });

export interface SimpleNavbarProps {
  brandText: string;
  navLinks: NavbarLinkProps[];
  expandedOnlyNavLinks?: NavbarLinkProps[];
  alertText?: ReactElement | ReactElement[] | string;
  displayAlert?: boolean;
  sticky?: boolean;
}

export const SimpleNavbar = ({
  brandText,
  expandedOnlyNavLinks,
  navLinks,
  alertText,
  displayAlert = false,
  sticky = false,
}: SimpleNavbarProps) => {
  const [navbarOpen, setNavbarOpen] = useState(false);

  const allLinks = expandedOnlyNavLinks
    ? [...navLinks, ...expandedOnlyNavLinks]
    : navLinks;

  useEffect(() => {
    if (displayAlert && !alertText) {
      logger.error("Alert requires custom text");
    }
  }, [displayAlert, alertText]);

  return (
    <motion.div initial={false} animate={navbarOpen ? "open" : "closed"}>
      <NavbarWrapper sticky={sticky} removeMarginBottom={navbarOpen}>
        <Brand href="/">{brandText}</Brand>
        <div>
          <div className="lg:flex hidden items-center">
            <NavbarLinks links={allLinks} />
            <ThemeToggle isLarge={true} id="MainThemeToggle" />
          </div>
          <div className="lg:hidden block justify-end">
            <MenuToggle toggle={() => setNavbarOpen(!navbarOpen)} />
          </div>
        </div>
      </NavbarWrapper>
      {navbarOpen && (
        <div className="block border-t mb-2">
          <MiniNav isOpen={navbarOpen} links={navLinks} includeThemeToggle />
        </div>
      )}
      {displayAlert && alertText && <NavAlert>{alertText}</NavAlert>}
    </motion.div>
  );
};
