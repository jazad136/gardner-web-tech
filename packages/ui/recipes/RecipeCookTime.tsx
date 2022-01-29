import Script from "next/script";
import {
  AccordionSection,
  AccordionSectionBody,
  AccordionSectionHeader,
  AccordionWrapper,
  DisplayTime,
} from "..";
import { CgBowl } from "react-icons/cg";
import { IoMdStopwatch } from "react-icons/io";
import { GiCookingPot, GiBubblingBowl } from "react-icons/gi";
import { Recipe } from ".";

export interface RecipeCookTimeProps {
  recipe: Recipe;
}

export const RecipeCookTime = ({ recipe }: RecipeCookTimeProps) => {
  const { prepTime, cookTime, restTime } = recipe;
  const iconStyle = { fontSize: "3em", marginBottom: "0.2em" };
  const id = "TotalCookTime";

  return (
    <AccordionWrapper id={id}>
      <AccordionSection>
        <AccordionSectionHeader id={id}>Total Cook Time</AccordionSectionHeader>
        <AccordionSectionBody id={id}>
          <div className="flex justify-evenly">
            <div className="block">
              <CgBowl style={iconStyle} className="mx-auto" />
              <div className="prose dark:prose-dark flex justify-center">
                Prep:{" "}
                <div className="flex justify-center">
                  {DisplayTime(prepTime)}
                </div>
              </div>
            </div>
            <div className="block">
              <GiCookingPot style={iconStyle} className="mx-auto" />
              <div className="prose dark:prose-dark flex justify-center">
                Cook:{" "}
                <div className="flex justify-center">
                  {DisplayTime(cookTime)}
                </div>
              </div>
            </div>
            {restTime && (
              <div className="block">
                <GiBubblingBowl style={iconStyle} className="mx-auto" />

                <div className="prose dark:prose-dark flex justify-center">
                  Rest/Marinade:{" "}
                  <div className="flex justify-center">
                    {DisplayTime(restTime)}
                  </div>
                </div>
              </div>
            )}
            <div className="block">
              <IoMdStopwatch style={iconStyle} className="mx-auto" />
              <div className="prose dark:prose-dark flex justify-center">
                Total:{" "}
                <div className="flex justify-center">
                  {DisplayTime(prepTime + cookTime + restTime)}
                </div>
              </div>
            </div>
          </div>
        </AccordionSectionBody>
      </AccordionSection>
    </AccordionWrapper>
  );
};
