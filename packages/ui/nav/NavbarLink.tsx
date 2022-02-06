import React from "react";
import Link from "next/link";
import cn from "classnames";

export interface NavbarLinkProps {
  href: string;
  text: string;
  removeRightMargin?: boolean;
  display?: boolean;
}

export const NavbarLink = ({
  href,
  text,
  removeRightMargin: removeLeftMargin = false,
  display = true,
}: NavbarLinkProps) => {
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
