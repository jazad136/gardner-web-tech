import React from "react";
import { DropdownOptionsInterface, Paragraph } from "..";

export interface IngredientBatchesDropdownProps {
  batches: number;
  setBatches: React.Dispatch<React.SetStateAction<number>>;
  serves: number;
}

let options: DropdownOptionsInterface[] = [
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

export const IngredientBatchesDropdown = ({
  batches,
  setBatches,
  serves,
}: IngredientBatchesDropdownProps) => {
  if (serves <= 1) {
    options = options.filter((option) => option.value !== 0.5);
  }

  return (
    <div className="relative inline-block ml-8 text-gray-700">
      <div className="flex items-center">
        <label htmlFor="servings" className="mr-4">
          <Paragraph>Batches: </Paragraph>
        </label>
        <select
          className="w-full h-10 pl-4 pr-10 text-base placeholder-gray-600 border border-slate-300 rounded-lg appearance-none focus:shadow-outline"
          id="servings"
          placeholder="Servings"
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
      <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
        <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
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
