import { useMemo } from "react"
import { DateTime, type DateTimeFormatOptions } from "luxon";

export const FORMAT_FULL = 'MM/dd/yyyy HH:mm:ss';

export default function Date({
  date,
  format
}: {
  date: string | Date,
  format: string | DateTimeFormatOptions
}) {
  const formattedDate = useMemo(() => {
    let luxon;

    if (typeof date === 'object') {
      luxon = DateTime.fromJSDate(date);
    } else {
      luxon = DateTime.fromISO(date);
    }

    return luxon.toFormat(format as string);
  }, [date, format]);

  return <>
    { formattedDate }
  </>;
}