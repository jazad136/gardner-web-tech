import cn from "classnames";
import Link from "next/link";
import React from "react";

export type NavbarLinkProps = {
  href: string;
  text: string;
  removeRightMargin?: boolean;
  display?: boolean;
};

const NavbarLink: React.FC<NavbarLinkProps> = ({
  href,
  text,
  removeRightMargin: removeLeftMargin = false,
  display = true,
}) => {
  if (!display) {
    return <></>;
  }

  return (
    <li className="nav-item">
      <Link href={href}>
        <a
          className={cn(
            "flex prose dark:prose-dark text-primary lg:text-sm lg:leading-loose uppercase hover:opacity-75 my-2",
            {
              "lg:m-0 lg:mr-4": !removeLeftMargin,
            }
          )}
        >
          {text}
        </a>
      </Link>
    </li>
  );
};

export default NavbarLink;
