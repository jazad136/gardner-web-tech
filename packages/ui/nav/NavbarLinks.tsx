import React from "react";
import { NavbarLink, NavbarLinkProps } from "./NavbarLink";
import cn from "classnames";

export interface NavbarLinksProps {
  links: NavbarLinkProps[];
  isCol?: boolean;
  removeRightMargins?: boolean;
}

export const NavbarLinks = ({
  links,
  isCol = false,
  removeRightMargins: removeLeftMargins = false,
}: NavbarLinksProps) => {
  return (
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
};
