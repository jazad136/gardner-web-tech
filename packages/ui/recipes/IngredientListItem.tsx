import { Ingredient } from ".";

export interface IngredientListItemProps {
  ingredient: Ingredient;
}

export const IngredientListItem = ({ ingredient }: IngredientListItemProps) => (
  <li className="w-full md:w-1/2 mb-6">
    <div className="prose dark:prose-dark flex flex-col-reverse sm:flex-row">
      <span className="prose dark:prose-dark mr-4 italic">
        {ingredient.quantity}
      </span>
      <span className="prose dark:prose-dark font-bold whitespace-nowrap">
        {ingredient.title}
      </span>
    </div>
    <div className="prose dark:prose-dark text-sm">{ingredient.notes}</div>
  </li>
);
