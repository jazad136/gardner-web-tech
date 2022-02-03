import React, { useEffect, useState } from "react";

export interface IngredientServingsDropdownProps {
  servings: number;
  setServings: (servings: number) => void;
}

export const IngredientServingsDropdown = ({
  servings,
  setServings,
}: IngredientServingsDropdownProps) => {
  return (
    <div className="relative inline-block ml-6 my-2 text-gray-700">
      <div className="flex items-center">
        <label htmlFor="servings" className="mr-4">
          Servings:{" "}
        </label>
        <select
          className="w-full h-10 pl-4 pr-10 text-base placeholder-gray-600 border border-slate-300 rounded-lg appearance-none focus:shadow-outline"
          id="servings"
          placeholder="Servings"
          value={servings}
          onChange={(e) => setServings(parseInt(e.target.value))}
        >
          <option value={1}>1</option>
          <option value={2}>2</option>
          <option value={3}>3</option>
        </select>
      </div>
      <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
        <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
          <path
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clip-rule="evenodd"
            fill-rule="evenodd"
          ></path>
        </svg>
      </div>
    </div>
  );
};
