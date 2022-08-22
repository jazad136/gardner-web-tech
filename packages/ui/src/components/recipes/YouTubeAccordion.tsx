import React from "react";

import {
  AccordionSection,
  AccordionSectionBody,
  AccordionSectionHeader,
  AccordionWrapper
} from "../accordion";
import { SectionHeader } from "../text";
import YouTubeListItem from "./YouTubeListItem";

type Props = {
  youTubeUrls: string[];
  isOpen?: boolean;
  setIsOpen?: React.Dispatch<React.SetStateAction<boolean>>;
};

const YouTubeAccordion: React.FC<Props> = ({
  youTubeUrls,
  isOpen,
  setIsOpen,
}) => {
  if (!youTubeUrls) {
    return <></>;
  }

  return (
    <AccordionWrapper value={isOpen ? "videos" : ""}>
      <AccordionSection value="videos">
        <AccordionSectionHeader handleOnClick={() => setIsOpen(!isOpen)}>
          <SectionHeader removeMarginBottom>Videos</SectionHeader>
        </AccordionSectionHeader>
        <AccordionSectionBody>
          <div className="overflow-none mx-4 mb-4 h-full w-full">
            <ul className="w-full list-none pl-0 pr-10">
              {(youTubeUrls ?? []).map((url, index) => (
                <YouTubeListItem youTubeUrl={url} key={`youtube-${index}`} />
              ))}
            </ul>
          </div>
        </AccordionSectionBody>
      </AccordionSection>
    </AccordionWrapper>
  );
};

export default YouTubeAccordion;
