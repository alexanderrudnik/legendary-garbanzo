import { EngLevelEnum } from "@/common/models/EngLevelEnum";
import { PositionEnum } from "@/common/models/PositionEnum";

export interface Proposal {
  id: string;
  owner: string;
  rate: string;
  yearsOfExperience: string;
  skills: string[];
  engLevel: EngLevelEnum;
  description?: string;
  CVLink: string;
  startDate: number;
  duration: string;
  weeklyEmployment: string;
  location: string;
  position: keyof typeof PositionEnum;
  createdAt: number;
  contact: {
    email: string;
    telegram?: string;
  };
}
