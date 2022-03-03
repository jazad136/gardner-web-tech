import React from "react";
import Link from "next/link";
import { Button } from "..";

export interface RecipePrintButtonProps {
  slug: string;
}

export const RecipePrintButton = ({ slug }: RecipePrintButtonProps) => (
  <div className="hidden lg:flex">
    <Link href={{ pathname: "/recipe/print/[slug]", query: { slug } }}>
      <a>
        <Button color="success" isOutline size="md" ariaLabel="Print Recipe">
          Print
        </Button>
      </a>
    </Link>
  </div>
);
