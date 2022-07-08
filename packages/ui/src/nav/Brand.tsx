import React from "react";
import Link from "next/link";

type BrandProps = {
  children: string | JSX.Element | JSX.Element[];
  href: string;
};

const Brand: React.FC<BrandProps> = ({ children, href }) => (
  <Link href={href}>
    <a className="prose dark:prose-dark prose-lg leading-relaxed inline-block lg:ml-4 py-2 whitespace-nowrap uppercase">
      {children}
    </a>
  </Link>
);

export default Brand;
