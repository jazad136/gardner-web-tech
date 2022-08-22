import { CgBowl } from "react-icons/cg";
import { GiBubblingBowl, GiCookingPot } from "react-icons/gi";
import { IoMdStopwatch } from "react-icons/io";

import { Recipe } from "../../types";
import {
  AccordionSection,
  AccordionSectionBody,
  AccordionSectionHeader,
  AccordionWrapper
} from "../accordion";
import { SectionHeader } from "../text";
import RecipeCookTimeItem from "./RecipeCookTimeItem";

type Props = {
  recipe: Recipe;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const RecipeCookTime: React.FC<Props> = ({ recipe, isOpen, setIsOpen }) => {
  const { prepTime, cookTime, restTime } = recipe;
  const totalItems = !restTime ? 3 : 4;
  const iconStyle = { fontSize: "3em", marginBottom: "0.2em" };

  return (
    <AccordionWrapper value={isOpen ? "time" : ""}>
      <AccordionSection value="time">
        <AccordionSectionHeader handleOnClick={() => setIsOpen(!isOpen)}>
          <SectionHeader removeMarginBottom>Total Cook Time</SectionHeader>
        </AccordionSectionHeader>
        <AccordionSectionBody>
          <ul className="-mx-4 flex list-none flex-wrap">
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

export default RecipeCookTime;
