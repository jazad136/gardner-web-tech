import React from "react";
import { Duration } from "luxon";

type Props = {
  minutes: number;
};

/**
 * @param {number} minutes Number of minutes to display
 * @returns string
 */
const DisplayTime: React.FC<Props> = ({ minutes }: Props) => {
  const duration = Duration.fromObject({ minutes });
  const correctedDuration = duration.shiftTo("hours", "minutes");
  let displayDuration = correctedDuration.toFormat("m 'minutes'");

  if (correctedDuration.hours > 0) {
    displayDuration = correctedDuration.toFormat("h 'hours' m 'minutes'");
  }

  return <span className="prose dark:prose-dark">{displayDuration}</span>;
};

export default DisplayTime;
