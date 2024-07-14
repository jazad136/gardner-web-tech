import React from "react";

import { PortableText } from "@portabletext/react";

import {
  AccordionSection,
  AccordionSectionBody,
  AccordionSectionHeader,
  AccordionWrapper
} from "../accordion";
import { SectionHeader } from "../text";

type Props = {
  title: string;
  blocks: any;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const RecipeBlockTextAccordion: React.FC<Props> = ({
  title,
  blocks,
  isOpen,
  setIsOpen,
}) => (
  <>
    {blocks && (
      <AccordionWrapper value={!!isOpen ? title : ""}>
        <AccordionSection value={title}>
          <AccordionSectionHeader handleOnClick={() => setIsOpen(!isOpen)}>
            <SectionHeader className="capitalize" removeMarginBottom>
              {title}
            </SectionHeader>
          </AccordionSectionHeader>
          <AccordionSectionBody className="mx-8 py-0">
            <PortableText value={blocks} />
          </AccordionSectionBody>
        </AccordionSection>
      </AccordionWrapper>
    )}
  </>
);

export default RecipeBlockTextAccordion;
