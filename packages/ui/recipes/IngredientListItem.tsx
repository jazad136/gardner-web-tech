import { Ingredient } from ".";
import { Paragraph } from "..";

export interface IngredientListItemProps {
  ingredient: Ingredient;
}

export const IngredientListItem = ({ ingredient }: IngredientListItemProps) => (
  <li className="w-full md:w-1/2 lg:w-1/3">
    <Paragraph>
      <span className="block font-bold">{ingredient.title}</span>
      <span className="block">
        {ingredient.quantity || ""} {ingredient.unit || ""}
      </span>
      <span className="block prose-sm italic">{ingredient.notes}</span>
    </Paragraph>
  </li>
);
