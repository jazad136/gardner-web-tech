import * as Pino from "pino";
import YouTube, { Options } from "react-youtube";

const logger = Pino.default({ name: "YouTube" });

export interface YouTubeListItemProps {
  youTubeUrl: string;
  videoContainerWidth: number;
}

export const YouTubeListItem = ({
  youTubeUrl,
  videoContainerWidth,
}: YouTubeListItemProps) => {
  const uri = new URL(youTubeUrl);
  const youTubeId = uri.searchParams.get("v")?.toString();

  if (!youTubeId) {
    logger.warn("could not find YouTube Video Id from url");
    return;
  }

  const opts: Options = {
    height: ((videoContainerWidth / 16) * 9).toString(),
    width: (videoContainerWidth - 80).toString(),
    playerVars: {
      autoplay: 0,
    },
  };

  return (
    <li className="mx-auto">
      <YouTube
        className="max-w-full"
        videoId={youTubeId}
        id={youTubeId}
        opts={opts}
      />
    </li>
  );
};
