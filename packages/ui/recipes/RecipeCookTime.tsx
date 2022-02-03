import {
  AccordionSection,
  AccordionSectionBody,
  AccordionSectionHeader,
  AccordionWrapper,
  SectionHeader,
} from "..";
import { CgBowl } from "react-icons/cg";
import { IoMdStopwatch } from "react-icons/io";
import { GiCookingPot, GiBubblingBowl } from "react-icons/gi";
import { Recipe, RecipeCookTimeItem } from ".";

export interface RecipeCookTimeProps {
  recipe: Recipe;
  toggleBodyOpen: () => void;
  bodyOpen: boolean;
}

export const RecipeCookTime = ({
  recipe,
  toggleBodyOpen,
  bodyOpen,
}: RecipeCookTimeProps) => {
  const { prepTime, cookTime, restTime } = recipe;
  const totalItems = !restTime ? 3 : 4;
  const iconStyle = { fontSize: "3em", marginBottom: "0.2em" };
  const id = "TotalCookTime";

  return (
    <AccordionWrapper id={id}>
      <AccordionSection bodyOpen={bodyOpen}>
        <AccordionSectionHeader
          id={id}
          toggle={toggleBodyOpen}
          bodyOpen={bodyOpen}
        >
          <SectionHeader removeMarginBottom>Total Cook Time</SectionHeader>
        </AccordionSectionHeader>
        <AccordionSectionBody id={id} isOpen={bodyOpen}>
          <ul className="flex flex-wrap list-none -mx-4">
            <RecipeCookTimeItem
              title="prep"
              time={prepTime}
              totalItems={totalItems}
            >
              <CgBowl style={iconStyle} className="mx-auto" />
            </RecipeCookTimeItem>
            <RecipeCookTimeItem
              title="cook"
              time={cookTime}
              totalItems={totalItems}
            >
              <GiCookingPot style={iconStyle} className="mx-auto" />
            </RecipeCookTimeItem>
            {restTime && (
              <RecipeCookTimeItem
                title="Rest/Marinade"
                rest={restTime}
                totalItems={totalItems}
              >
                <GiBubblingBowl style={iconStyle} className="mx-auto" />
              </RecipeCookTimeItem>
            )}
            <RecipeCookTimeItem
              title="Total"
              time={prepTime + cookTime}
              totalItems={totalItems}
            >
              <IoMdStopwatch style={iconStyle} className="mx-auto" />
            </RecipeCookTimeItem>
          </ul>
        </AccordionSectionBody>
      </AccordionSection>
    </AccordionWrapper>
  );
};
