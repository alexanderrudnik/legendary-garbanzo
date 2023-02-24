import { PositionEnum } from "./PositionEnum";

export interface Filters {
  rate: [string, string];
  position: keyof typeof PositionEnum | "";
  skills: string[];
  location: string;
  hideMy: boolean;
}
