import React from "react";
import Link from "next/link";
import { Button } from "..";

export interface RecipeMakeButtonProps {
  slug: string;
  batches: number;
}

export const RecipeMakeButton = ({ slug, batches }: RecipeMakeButtonProps) => (
  <div className="flex">
    <Link href={{ pathname: "/make/[slug]", query: { slug, batches } }}>
      <a>
        <Button color="secondary" isOutline size="md" ariaLabel="Make Recipe">
          Make
        </Button>
      </a>
    </Link>
  </div>
);
