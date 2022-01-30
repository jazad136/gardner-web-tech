import { Ingredient } from ".";

export interface IngredientListItemProps {
  ingredient: Ingredient;
}

export const IngredientListItem = ({ ingredient }: IngredientListItemProps) => (
  <li className="w-full sm:w-1/2 mb-6 px-4">
    <div className="prose dark:prose-dark flex justify-between">
      {ingredient.title}
      <span className="prose dark:prose-dark">{ingredient.quantity}</span>
    </div>
    <div className="prose dark:prose-dark text-sm">{ingredient.notes}</div>
  </li>
);
