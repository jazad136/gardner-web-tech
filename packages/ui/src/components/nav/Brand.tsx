import Link from "next/link";
import React from "react";

type BrandProps = {
  href: string;
};

const Brand: React.FC<BrandProps> = ({ children, href }) => (
  <Link href={href}>
    <a className="prose dark:prose-dark prose-lg inline-block whitespace-nowrap py-2 uppercase leading-relaxed lg:ml-4">
      {children}
    </a>
  </Link>
);

export default Brand;
