import * as React from "react";
import { Ingredient, IngredientListItem } from ".";
import {
  AccordionSection,
  AccordionSectionBody,
  AccordionSectionHeader,
  AccordionWrapper,
  SectionHeader,
} from "..";
import { IngredientBatchesDropdown } from "./IngredientBatchesDropdown";

export interface IngredientListProps {
  id: string;
  bodyOpen: boolean;
  toggleBodyOpen: () => void;
  ingredients: Ingredient[];
  batches: number;
  setBatches: React.Dispatch<React.SetStateAction<number>>;
  serves: number;
}

export const IngredientList = ({
  id,
  bodyOpen,
  toggleBodyOpen,
  ingredients,
  batches,
  setBatches,
  serves,
}: IngredientListProps) => (
  <AccordionWrapper id={id}>
    <AccordionSection bodyOpen={bodyOpen}>
      <AccordionSectionHeader
        id={id}
        toggle={toggleBodyOpen}
        bodyOpen={bodyOpen}
      >
        <SectionHeader removeMarginBottom>Ingredients</SectionHeader>
      </AccordionSectionHeader>
      <AccordionSectionBody id={id} isOpen={bodyOpen}>
        <IngredientBatchesDropdown
          batches={batches}
          setBatches={setBatches}
          serves={serves}
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
