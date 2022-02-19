import { YouTubeListItem } from ".";
import {
  AccordionSection,
  AccordionSectionBody,
  AccordionSectionHeader,
  AccordionWrapper,
  SectionHeader,
} from "..";

export interface YouTubeAccordionProps {
  youTubeUrls: string[];
}

export const YouTubeAccordion = ({ youTubeUrls }: YouTubeAccordionProps) => {
  if (!youTubeUrls) {
    return <></>;
  }

  return (
    <AccordionWrapper defaultValue="videos">
      <AccordionSection value="videos">
        <AccordionSectionHeader>
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
