import { AccordionImplSingleProps } from "@radix-ui/react-accordion";
import React from "react";
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
  ingredients: Ingredient[];
  batches: number;
  setBatches: React.Dispatch<React.SetStateAction<number>>;
  serves: number;
}

export const IngredientList = ({
  ingredients,
  batches,
  setBatches,
  serves,
}: IngredientListProps) => (
  <AccordionWrapper defaultValue="ingredients">
    <AccordionSection value="ingredients">
      <AccordionSectionHeader>
        <SectionHeader removeMarginBottom>Ingredients</SectionHeader>
      </AccordionSectionHeader>
      <AccordionSectionBody>
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
