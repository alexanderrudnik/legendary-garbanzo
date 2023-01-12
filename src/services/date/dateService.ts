import dayjs, { Dayjs } from "dayjs";

export type AppDate = Dayjs;

class DateService {
  getDate(string: string) {
    return dayjs(string);
  }
}

export const dateService = new DateService();
