import React from "react";
import { Ingredient } from ".";
import {
  AccordionSection,
  AccordionSectionBody,
  AccordionSectionHeader,
  AccordionWrapper,
  Paragraph,
  SectionHeader,
} from "../..";
import IngredientBatchesDropdown from "./IngredientBatchesDropdown";
import IngredientListItem from "./IngredientListItem";

type Props = {
  ingredients: Ingredient[];
  batches: number;
  setBatches: React.Dispatch<React.SetStateAction<number>>;
  serves: number;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const IngredientList: React.FC<Props> = ({
  ingredients,
  batches,
  setBatches,
  serves,
  isOpen,
  setIsOpen,
}) => (
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

export default IngredientList;
