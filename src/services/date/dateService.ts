import dayjs, { Dayjs } from "dayjs";
import LocalizedFormat from "dayjs/plugin/localizedFormat";

dayjs.extend(LocalizedFormat);

export type AppDate = Dayjs;

class DateService {
  getDate(string: string | number) {
    return dayjs(string);
  }
}

export const dateService = new DateService();
