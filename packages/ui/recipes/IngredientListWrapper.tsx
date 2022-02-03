import { useMemo, useState } from "react";
import { Ingredient } from ".";
import { getFractionFromString } from "..";
import { IngredientList } from "./IngredientList";

export interface IngredientListProps {
  ingredients: Ingredient[];
  bodyOpen: boolean;
  toggleBodyOpen: () => void;
}

export const IngredientListWrapper = ({
  ingredients,
  bodyOpen,
  toggleBodyOpen,
}: IngredientListProps) => {
  const [servings, setServings] = useState(1);
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

  const getIntOrDefault = (itemToCheck: string): number => {
    return parseInt(itemToCheck) || -1;
  };

  const getQuantityFromString = (
    quantity: string,
    servings: number
  ): string => {
    const { quantity: numberQuantity, unit } =
      separateIngredientQuantityAndUnit(quantity);

    const isFraction = numberQuantity.includes("/");
    let newQuantity = 0;

    if (!isFraction) {
      const oldQuantity = getIntOrDefault(numberQuantity);

      if (oldQuantity < 0) {
        return quantity;
      }

      newQuantity = oldQuantity * servings;
    } else {
      newQuantity = getFractionFromString(numberQuantity).multiply(servings);
    }

    return `${newQuantity} ${unit}`;
  };

  const mappedIngredients: Ingredient[] = useMemo(() => {
    return (ingredients ?? []).map((ingredient) => ({
      ...ingredient,
      quantity: getQuantityFromString(ingredient.quantity, servings),
    }));
  }, [ingredients, servings]);

  return (
    <IngredientList
      id={id}
      bodyOpen={bodyOpen}
      toggleBodyOpen={toggleBodyOpen}
      ingredients={mappedIngredients}
      servings={servings}
      setServings={setServings}
    />
  );
};
