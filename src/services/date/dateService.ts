import dayjs, { Dayjs } from "dayjs";
import LocalizedFormat from "dayjs/plugin/localizedFormat";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";

dayjs.extend(isSameOrAfter);
dayjs.extend(LocalizedFormat);

export type AppDate = Dayjs;

class DateService {
  getDate(string: string | number) {
    return dayjs(string);
  }

  getNow() {
    return dayjs();
  }
}

export const dateService = new DateService();
