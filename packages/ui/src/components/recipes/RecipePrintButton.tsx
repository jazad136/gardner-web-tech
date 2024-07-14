import Link from "next/link";
import React from "react";

import Button from "../Button";

type Props = {
  slug: string;
};

const RecipePrintButton: React.FC<Props> = ({ slug }) => (
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

export default RecipePrintButton;
