import React from "react";
import NavbarLink, { NavbarLinkProps } from "./NavbarLink";
import cn from "classnames";

export type NavbarLinksProps = {
  links: NavbarLinkProps[];
  isCol?: boolean;
  removeRightMargins?: boolean;
};

const NavbarLinks: React.FC<NavbarLinksProps> = ({
  links,
  isCol = false,
  removeRightMargins: removeLeftMargins = false,
}) => (
  <ul
    className={cn("flex list-none", {
      "flex-col": isCol,
      "lg:flex-row flex-col": !isCol,
    })}
  >
    {(links ?? []).map(
      (link, index) =>
        link.display && (
          <NavbarLink
            key={`nav-link-${index}`}
            href={link.href}
            removeRightMargin={removeLeftMargins}
            text={link.text}
          />
        )
    )}
  </ul>
);

export default NavbarLinks;
