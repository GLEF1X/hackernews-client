import dayjs from "dayjs";
import plugin from "dayjs/plugin/relativeTime";

dayjs.extend(plugin);

export function formatDateFromNow(date: string | number | dayjs.Dayjs): string {
  if (typeof date === "string" && Object.prototype.toString.call(date) === "[object String]") {
    date = dayjs(date);
  } else if (typeof date === "number" && Number.isFinite(date) && !isNaN(date)) {
    date = dayjs.unix(date);
  }

  return (<dayjs.Dayjs>date).fromNow();
}
