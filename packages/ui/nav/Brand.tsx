import * as React from "react";
import { ReactElement } from "react";
import Link from "next/link";

export interface BrandProps {
  children: string | ReactElement | ReactElement[];
  href: string;
}

export const Brand = ({ children, href }: BrandProps) => {
  return (
    <Link href={href}>
      <a className="prose dark:prose-dark leading-relaxed inline-block lg:ml-4 py-2 whitespace-nowrap uppercase">
        {children}
      </a>
    </Link>
  );
};
