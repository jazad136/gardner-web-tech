import { useEffect, useRef, useState } from "react";
import { YouTubeListItem } from ".";
import {
  AccordionSection,
  AccordionSectionBody,
  AccordionSectionHeader,
  AccordionWrapper,
} from "..";
import * as Pino from "pino";

const logger = Pino.default({ name: "YouTubeAccordion" });

export interface YouTubeAccordionProps {
  youTubeUrls: string[];
}

export const YouTubeAccordion = ({ youTubeUrls }: YouTubeAccordionProps) => {
  const id = "YouTubeVideos";
  const videoContainerRef = useRef<HTMLDivElement>(null);
  const [videoContainerWidth, setVideoContainerWidth] = useState(0);

  // get width of container to set width of video
  useEffect(() => {
    if (videoContainerRef.current) {
      setVideoContainerWidth(videoContainerRef.current.offsetWidth);
    }
  }, [videoContainerRef]);

  if ((youTubeUrls ?? []).length === 0) {
    return <></>;
  }

  return (
    <AccordionWrapper id={id}>
      <AccordionSection>
        <AccordionSectionHeader id={id}>Videos</AccordionSectionHeader>
        <AccordionSectionBody id={id}>
          <div ref={videoContainerRef} className="w-full">
            <ul className="list-none flex flex-wrap -mx-4">
              {(youTubeUrls ?? []).map((url) => (
                <YouTubeListItem
                  youTubeUrl={url}
                  videoContainerWidth={videoContainerWidth}
                />
              ))}
            </ul>
          </div>
        </AccordionSectionBody>
      </AccordionSection>
    </AccordionWrapper>
  );
};
