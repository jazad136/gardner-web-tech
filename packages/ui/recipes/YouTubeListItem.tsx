import React from "react";
import YouTube, { Options } from "react-youtube";
import * as Pino from "pino";

const logger = Pino.default({ name: "YouTube" });

type Props = {
  youTubeUrl: string;
};

const YouTubeListItem: React.FC<Props> = ({ youTubeUrl }) => {
  const uri = new URL(youTubeUrl);
  const youTubeId = uri.searchParams.get("v")?.toString();

  if (!youTubeId) {
    logger.warn("could not find YouTube Video Id from url");
    return <></>;
  }

  const opts: Options = {
    width: "853",
    height: "480",
    playerVars: {
      autoplay: 0,
    },
  };

  return (
    <li className="overflow-hidden">
      <YouTube
        videoId={youTubeId}
        id={youTubeId}
        opts={opts}
        className="absolute left-0 top-0 h-full w-full"
        containerClassName="overflow-hidden relative h-0 pb-[56.25%]"
      />
    </li>
  );
};

export default YouTubeListItem;
