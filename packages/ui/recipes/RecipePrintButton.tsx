import React from "react";
import Link from "next/link";
import { Button } from "..";

export interface RecipePrintButtonProps {
  slug: string;
  handleSetLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

export const RecipePrintButton = ({
  slug,
  handleSetLoading,
}: RecipePrintButtonProps) => (
  <div className="hidden lg:flex justify-center">
    <Link href={{ pathname: "/print/[slug]", query: { slug } }}>
      <a>
        <Button onClick={handleSetLoading} color="success" isOutline size="md">
          Print
        </Button>
      </a>
    </Link>
  </div>
);
