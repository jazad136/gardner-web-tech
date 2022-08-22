import React from "react";

import { Ingredient } from "../../types";
import {
  AccordionSection,
  AccordionSectionBody,
  AccordionSectionHeader,
  AccordionWrapper
} from "../accordion";
import { Paragraph, SectionHeader } from "../text";
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
        <div className="flex flex-wrap">
          <div className="w-full md:w-1/2 lg:w-1/3">
            {!!setBatches && batches && serves ? (
              <IngredientBatchesDropdown
                batches={batches}
                setBatches={setBatches}
                serves={serves}
              />
            ) : (
              <div className="prose dark:prose-dark relative ml-8 inline-block">
                <Paragraph>
                  <span>Batches: {batches}</span>
                </Paragraph>
              </div>
            )}
          </div>
          <Paragraph className="ml-6 w-full font-bold md:w-1/2 lg:w-1/3">
            Serves: {serves} {serves === 1 ? "Person" : "People"}
          </Paragraph>
        </div>
        <ul className="flex list-none flex-wrap">
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
