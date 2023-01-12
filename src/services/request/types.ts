import { EngLevelEnum } from "@/common/models/EngLevelEnum";
import { PositionEnum } from "@/common/models/PositionEnum";

export interface IRequest {
  rate: number;
  yearsOfExperience: number;
  skills: string[];
  engLevel: EngLevelEnum;
  description?: string;
  startDate: number;
  duration: number;
  weeklyEmployment: number;
  location: string;
  position: PositionEnum;
}
