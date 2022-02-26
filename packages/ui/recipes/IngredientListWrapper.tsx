import React, { useMemo } from "react";
import { Ingredient } from ".";
import { getFractionFromString } from "..";
import { IngredientList } from "./IngredientList";
import { Fraction } from "fractional";

export interface IngredientListProps {
  ingredients: Ingredient[];
  serves: number;
  batches: number;
  setBatches?: React.Dispatch<React.SetStateAction<number>>;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const IngredientListWrapper = ({
  ingredients,
  serves,
  batches,
  setBatches,
  isOpen,
  setIsOpen,
}: IngredientListProps) => {
  const getQuantityFromString = (quantity: string): string => {
    if (!quantity) {
      return "";
    }

    let newQuantity = getFractionFromString(quantity).multiply(
      new Fraction(batches)
    );

    return newQuantity.toString();
  };

  const mappedIngredients: Ingredient[] = useMemo(() => {
    return (ingredients ?? []).map((ingredient) => ({
      ...ingredient,
      quantity: getQuantityFromString(ingredient.quantity),
    }));
  }, [ingredients, batches]);

  return (
    <IngredientList
      ingredients={mappedIngredients}
      batches={batches}
      setBatches={setBatches}
      serves={serves}
      isOpen={isOpen}
      setIsOpen={setIsOpen}
    />
  );
};
