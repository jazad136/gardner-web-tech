import * as React from "react";
import { Ingredient, IngredientListItem } from ".";
import {
  AccordionSection,
  AccordionSectionBody,
  AccordionSectionHeader,
  AccordionWrapper,
} from "..";
import { IngredientServingsDropdown } from "./IngredientServingsDropdown";

export interface IngredientListProps {
  id: string;
  bodyOpen: boolean;
  toggleBodyOpen: () => void;
  ingredients: Ingredient[];
  servings: number;
  setServings: React.Dispatch<React.SetStateAction<number>>;
}

export const IngredientList = ({
  id,
  bodyOpen,
  toggleBodyOpen,
  ingredients,
  servings,
  setServings,
}: IngredientListProps) => (
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
        <IngredientServingsDropdown
          servings={servings}
          setServings={setServings}
        />
        <ul className="list-none flex flex-wrap">
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
