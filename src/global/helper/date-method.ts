import { parseDateTime } from "@internationalized/date";
import { format, parse } from "date-fns";

const setDate = (date: string | null | undefined) => {
  if (date) {
    const parsedDate = parse(date, "dd-MMM-yyyy HH:mm:ss", new Date());

    const formattedDate = format(parsedDate, "yyyy-MM-dd'T'HH:mm:ss");

    return formattedDate &&
      formattedDate?.toLowerCase()?.replaceAll(" ", "") !== "invaliddate" &&
      formattedDate?.toLowerCase()?.replaceAll(" ", "") !== "invaliddate." &&
      formattedDate !== "Invalid date" &&
      formattedDate !== "Invalid date."
      ? parseDateTime(formattedDate)
      : undefined;
  } else {
    return undefined;
  }
};

export { setDate };
