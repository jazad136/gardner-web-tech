import React from "react";

import * as Label from "@radix-ui/react-label";

import { DropdownOptions } from "../../types";
import { Paragraph } from "../text";

type Props = {
  batches: number;
  setBatches: React.Dispatch<React.SetStateAction<number>>;
  serves: number;
};

let options: DropdownOptions[] = [
  {
    value: 0.5,
    label: "1/2",
  },
  {
    value: 1,
    label: "1",
  },
  {
    value: 2,
    label: "2",
  },
  {
    value: 3,
    label: "3",
  },
  {
    value: 4,
    label: "4",
  },
  {
    value: 5,
    label: "5",
  },
];

const IngredientBatchesDropdown: React.FC<Props> = ({
  batches,
  setBatches,
  serves,
}) => {
  if (serves <= 1) {
    options = options.filter((option) => option.value !== 0.5);
  }

  return (
    <div className="prose dark:prose-dark relative ml-8 inline-block">
      <div className="flex items-center">
        <Label.Root htmlFor="servings" className="mr-4">
          <Paragraph className="font-bold">Batches: </Paragraph>
        </Label.Root>
        <select
          className="prose dark:prose-dark focus:shadow-outline h-10 w-full appearance-none rounded-lg border border-slate-400 pl-4 pr-10 dark:border-slate-300"
          id="servings"
          value={batches}
          onChange={(e) => setBatches(parseFloat(e.target.value))}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2">
        <svg className="h-4 w-4 fill-current" viewBox="0 0 20 20">
          <path
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clipRule="evenodd"
            fillRule="evenodd"
          ></path>
        </svg>
      </div>
    </div>
  );
};

export default IngredientBatchesDropdown;
