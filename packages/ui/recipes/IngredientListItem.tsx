import { Ingredient } from ".";
import { Paragraph } from "..";

export interface IngredientListItemProps {
  ingredient: Ingredient;
}

export const IngredientListItem = ({ ingredient }: IngredientListItemProps) => (
  <li className="w-full md:w-1/2 lg:w-1/3">
    <Paragraph>
      <div className="font-bold">{ingredient.title}</div>
      <div>
        {ingredient.quantity || ""} {ingredient.unit || ""}
      </div>
      <div className="prose-sm italic">{ingredient.notes}</div>
    </Paragraph>
  </li>
);
