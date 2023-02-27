import { EngLevelEnum } from "./EngLevelEnum";
import { PositionEnum } from "./PositionEnum";

export interface Filters {
  rate: [string, string];
  position: keyof typeof PositionEnum | "";
  skills: string[];
  location: string;
  hideMy: boolean;
  engLevel: keyof typeof EngLevelEnum | "";
  yearsOfExperience: [string, string];
  startDate: string;
  weeklyEmployment: [string, string];
}
