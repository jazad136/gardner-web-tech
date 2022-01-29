import { Ingredient, IngredientListItem } from ".";
import {
  AccordionSection,
  AccordionSectionBody,
  AccordionSectionHeader,
  AccordionWrapper,
} from "..";

export interface IngredientListProps {
  ingredients: Ingredient[];
}

export const IngredientList = ({ ingredients }: IngredientListProps) => {
  const id = "IngredientList";

  return (
    <AccordionWrapper id={id}>
      <AccordionSection>
        <AccordionSectionHeader id={id}>Ingredients</AccordionSectionHeader>
        <AccordionSectionBody id={id}>
          <ul className="list-none flex flex-wrap -mx-4">
            {(ingredients ?? []).map((ingredient) => (
              <IngredientListItem
                ingredient={ingredient}
                key={ingredient.title}
              />
            ))}
          </ul>
        </AccordionSectionBody>
      </AccordionSection>
    </AccordionWrapper>
  );
};
