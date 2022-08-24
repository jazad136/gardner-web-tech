import { motion } from "framer-motion";
import * as Pino from "pino";
import React, { useEffect, useState } from "react";

import ThemeToggle from "../ThemeToggle";
import Brand from "./Brand";
import MenuToggle from "./MenuToggle";
import MiniNav from "./MiniNav";
import NavAlert from "./NavAlert";
import { NavbarLinkProps } from "./NavbarLink";
import NavbarLinks from "./NavbarLinks";
import NavbarWrapper from "./NavbarWrapper";

const logger = Pino.default({ name: "SimpleNavbar" });

type SimpleNavbarProps = {
  brandText: string;
  navLinks: NavbarLinkProps[];
  expandedOnlyNavLinks?: NavbarLinkProps[];
  alertText?: JSX.Element;
  displayAlert?: boolean;
  sticky?: boolean;
};

const SimpleNavbar: React.FC<SimpleNavbarProps> = ({
  brandText,
  expandedOnlyNavLinks,
  navLinks,
  alertText,
  displayAlert = false,
  sticky = false,
}) => {
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
          <div className="hidden items-center lg:flex">
            <NavbarLinks links={allLinks} />
            <ThemeToggle id="MainThemeToggle" />
          </div>
          <div className="block justify-end lg:hidden">
            <MenuToggle toggle={() => setNavbarOpen(!navbarOpen)} />
          </div>
        </div>
      </NavbarWrapper>
      {navbarOpen && (
        <div className="mb-2 block border-t">
          <MiniNav isOpen={navbarOpen} links={navLinks} includeThemeToggle />
        </div>
      )}
      {displayAlert && alertText && <NavAlert>{alertText}</NavAlert>}
    </motion.div>
  );
};

export default SimpleNavbar;
