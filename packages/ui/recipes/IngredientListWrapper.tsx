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

  const separateIngredientQuantityAndUnit = (
    ingredientQuantity: string
  ): { quantity: string; unit: string } => {
    const spaceIndex = ingredientQuantity.indexOf(" ");
    const quantity = ingredientQuantity.substring(0, spaceIndex);
    const unit = ingredientQuantity.substring(spaceIndex + 1);

    return {
      quantity,
      unit,
    };
  };

  const getFloatOrDefault = (itemToCheck: string): number => {
    return parseFloat(itemToCheck) || -1;
  };

  const getQuantityFromString = (quantity: string): string => {
    const { quantity: numberQuantity, unit } =
      separateIngredientQuantityAndUnit(quantity);

    const isFraction = numberQuantity.includes("/");
    let newQuantity: Fraction = null;

    if (!isFraction) {
      const oldQuantity = getFloatOrDefault(numberQuantity);

      if (oldQuantity < 0) {
        return quantity;
      }

      newQuantity = getFractionFromString(oldQuantity.toString()).multiply(
        new Fraction(batches)
      );
    } else {
      newQuantity = getFractionFromString(numberQuantity).multiply(
        new Fraction(batches)
      );
    }

    return `${newQuantity.toString()} ${unit}`;
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
