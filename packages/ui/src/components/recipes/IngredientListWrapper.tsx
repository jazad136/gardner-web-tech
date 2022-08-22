import { Fraction } from "fractional";
import React, { useMemo } from "react";

import { getFractionFromString } from "../../lib";
import { Ingredient } from "../../types";
import IngredientList from "./IngredientList";

type Props = {
  ingredients: Ingredient[];
  serves: number;
  batches: number;
  setBatches?: React.Dispatch<React.SetStateAction<number>>;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const IngredientListWrapper: React.FC<Props> = ({
  ingredients,
  serves,
  batches,
  setBatches,
  isOpen,
  setIsOpen,
}) => {
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

export default IngredientListWrapper;
