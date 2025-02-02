import React from "react";
import { Ingredient } from ".";
import { Paragraph } from "..";

type Props = {
  ingredient: Ingredient;
};

const IngredientListItem: React.FC<Props> = ({ ingredient }) => (
  <li className="w-full md:w-1/2 lg:w-1/3">
    <Paragraph classNames="my-1.5" removeMarginBottom>
      <span className="block font-bold">{ingredient.title}</span>
      <span className="block">
        {ingredient.quantity || ""} {ingredient.unit || ""}
      </span>
      <span className="block prose-sm italic">{ingredient.notes}</span>
    </Paragraph>
  </li>
);

export default IngredientListItem;
