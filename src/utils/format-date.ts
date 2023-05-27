import dayjs from "dayjs";
import plugin from "dayjs/plugin/relativeTime";

dayjs.extend(plugin);

export function formatDateFromNow(date: string | number | Date): string {
  return dayjs(date).fromNow();
}

export function formatDate(date: string | number | Date): string {
  return dayjs(date).format();
}
