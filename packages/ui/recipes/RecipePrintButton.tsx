import React from "react";
import Link from "next/link";
import { Button } from "..";

export interface RecipePrintButtonProps {
  slug: string;
}

export const RecipePrintButton = ({ slug }: RecipePrintButtonProps) => (
  <div className="hidden lg:flex justify-center">
    <Link href={{ pathname: "/print/[slug]", query: { slug } }}>
      <a>
        <Button color="success" isOutline size="md">
          Print
        </Button>
      </a>
    </Link>
  </div>
);
