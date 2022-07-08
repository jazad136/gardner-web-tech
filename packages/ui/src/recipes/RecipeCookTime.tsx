import {
  AccordionSection,
  AccordionSectionBody,
  AccordionSectionHeader,
  AccordionWrapper,
  SectionHeader,
} from "../..";
import { Recipe, RecipeCookTimeItem } from ".";
import { CgBowl } from "react-icons/cg";
import { GiCookingPot, GiBubblingBowl } from "react-icons/gi";
import { IoMdStopwatch } from "react-icons/io";

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

export default RecipeCookTime;
