import { useMemo, useState } from "react";
import { Ingredient } from ".";
import { getFractionFromString } from "..";
import { IngredientList } from "./IngredientList";
import { Fraction } from "fractional";

export interface IngredientListProps {
  ingredients: Ingredient[];
  bodyOpen: boolean;
  toggleBodyOpen: () => void;
  serves: number;
}

export const IngredientListWrapper = ({
  ingredients,
  bodyOpen,
  toggleBodyOpen,
  serves,
}: IngredientListProps) => {
  const [batches, setBatches] = useState(1);
  const id = "IngredientList";

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
      id={id}
      bodyOpen={bodyOpen}
      toggleBodyOpen={toggleBodyOpen}
      ingredients={mappedIngredients}
      batches={batches}
      setBatches={setBatches}
      serves={serves}
    />
  );
};
