import React from "react";
import Link from "next/link";
import { Button } from "..";

type Props = {
  slug: string;
  batches: number;
};

const RecipeMakeButton: React.FC<Props> = ({ slug, batches }) => (
  <div className="flex">
    <Link href={{ pathname: "/recipe/make/[slug]", query: { slug, batches } }}>
      <a>
        <Button color="secondary" isOutline size="md" ariaLabel="Make Recipe">
          Make
        </Button>
      </a>
    </Link>
  </div>
);

export default RecipeMakeButton;
