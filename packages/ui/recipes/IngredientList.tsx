import { Ingredient, IngredientListItem } from ".";
import {
  AccordionSection,
  AccordionSectionBody,
  AccordionSectionHeader,
  AccordionWrapper,
} from "..";

export interface IngredientListProps {
  ingredients: Ingredient[];
  toggleBodyOpen: () => void;
  bodyOpen: boolean;
}

export const IngredientList = ({
  ingredients,
  toggleBodyOpen,
  bodyOpen,
}: IngredientListProps) => {
  const id = "IngredientList";

  return (
    <AccordionWrapper id={id}>
      <AccordionSection bodyOpen={bodyOpen}>
        <AccordionSectionHeader
          id={id}
          toggle={toggleBodyOpen}
          bodyOpen={bodyOpen}
        >
          Ingredients
        </AccordionSectionHeader>
        <AccordionSectionBody id={id} isOpen={bodyOpen}>
          <ul className="list-none flex flex-wrap -mx-4">
            {(ingredients ?? []).map((ingredient, index) => (
              <IngredientListItem
                ingredient={ingredient}
                key={`ingredient-${index}`}
              />
            ))}
          </ul>
        </AccordionSectionBody>
      </AccordionSection>
    </AccordionWrapper>
  );
};
