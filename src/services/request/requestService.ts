import { axiosInstance } from "../base/baseService";
import { IRequest } from "./types";

class RequestService {
  createRequest(details: IRequest) {
    return axiosInstance.post<IRequest>("/requests", details);
  }
}

export const requestService = new RequestService();
