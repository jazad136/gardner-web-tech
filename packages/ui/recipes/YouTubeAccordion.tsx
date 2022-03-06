import React from "react";
import {
  AccordionSection,
  AccordionSectionBody,
  AccordionSectionHeader,
  AccordionWrapper,
  SectionHeader,
} from "..";
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
          <div className="w-full h-full mx-4 mb-4 overflow-none">
            <ul className="list-none w-full pl-0 pr-10">
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
