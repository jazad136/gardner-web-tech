import React from "react";
import { Ingredient, IngredientListItem } from ".";
import {
  AccordionSection,
  AccordionSectionBody,
  AccordionSectionHeader,
  AccordionWrapper,
  Paragraph,
  SectionHeader,
} from "..";
import { IngredientBatchesDropdown } from "./IngredientBatchesDropdown";

export interface IngredientListProps {
  ingredients: Ingredient[];
  batches: number;
  setBatches: React.Dispatch<React.SetStateAction<number>>;
  serves: number;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const IngredientList = ({
  ingredients,
  batches,
  setBatches,
  serves,
  isOpen,
  setIsOpen,
}: IngredientListProps) => (
  <AccordionWrapper value={!!isOpen ? "ingredients" : ""}>
    <AccordionSection value="ingredients">
      <AccordionSectionHeader handleOnClick={() => setIsOpen(!isOpen)}>
        <SectionHeader removeMarginBottom>Ingredients</SectionHeader>
      </AccordionSectionHeader>
      <AccordionSectionBody>
        {!!setBatches && batches && serves ? (
          <IngredientBatchesDropdown
            batches={batches}
            setBatches={setBatches}
            serves={serves}
          />
        ) : (
          <div className="prose dark:prose-dark relative inline-block ml-8">
            <Paragraph>
              <span>Batches: {batches}</span>
            </Paragraph>
          </div>
        )}
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
