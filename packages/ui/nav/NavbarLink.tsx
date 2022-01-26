import Link from "next/link";
import cn from "classnames";

export interface NavbarLinkProps {
  href: string;
  text: string;
  removeLeftMargin?: boolean;
}

export const NavbarLink = ({
  href,
  text,
  removeLeftMargin = false,
}: NavbarLinkProps) => {
  return (
    <li className="nav-item">
      <Link href={href}>
        <a
          className={cn(
            "prose dark:prose-dark text-primary flex lg:text-sm uppercase hover:opacity-75 my-2",
            {
              "lg:m-0 lg:ml-5": !removeLeftMargin,
            }
          )}
        >
          {text}
        </a>
      </Link>
    </li>
  );
};
