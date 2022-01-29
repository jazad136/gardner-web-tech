import * as React from "react";
import PropTypes from "prop-types";
import { Duration } from "luxon";

export interface DisplayTimeProps {
  minutes: number;
}

/**
 * @param {number} minutes Number of minutes to display
 * @returns string
 */
export const DisplayTime = ({ minutes }: DisplayTimeProps) => {
  const duration = Duration.fromObject({ minutes });
  const correctedDuration = duration.shiftTo("hours", "minutes");
  let displayDuration = correctedDuration.toFormat("m 'minutes'");

  if (correctedDuration.hours > 0) {
    displayDuration = correctedDuration.toFormat("h 'hours' m 'minutes'");
  }

  return <span className="prose dark:prose-dark">{displayDuration}</span>;
};

DisplayTime.propTypes = {
  minutes: PropTypes.number,
};
