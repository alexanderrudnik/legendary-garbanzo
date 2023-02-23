import { PositionEnum } from "./PositionEnum";

export type FiltersOwn = "my" | "notMy" | "";

export interface Filters {
  rate: [string, string];
  position: keyof typeof PositionEnum | "";
  skills: string[];
  location: string;
  own: FiltersOwn;
}
