import { IRequest } from "@/services/request/types";

export interface RequestInputs extends Omit<IRequest, "startDate"> {
  startDate: string;
}
