import { NavbarLink, NavbarLinkProps } from "./NavbarLink";
import cn from "classnames";

export interface NavbarLinksProps {
  links: NavbarLinkProps[];
  isCol?: boolean;
  removeLeftMargins?: boolean;
}

export const NavbarLinks = ({
  links,
  isCol = false,
  removeLeftMargins,
}: NavbarLinksProps) => {
  return (
    <ul
      className={cn("flex list-none", {
        "flex-col": isCol,
        "lg:flex-row flex-col": !isCol,
      })}
    >
      {(links ?? []).map((link) => (
        <NavbarLink
          key={link.text}
          href={link.href}
          text={link.text}
          removeLeftMargin={removeLeftMargins}
        />
      ))}
    </ul>
  );
};
