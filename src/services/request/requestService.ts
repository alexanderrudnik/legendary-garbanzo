import { axiosInstance } from "../base/baseService";
import { IRequest } from "./types";

class RequestService {
  createRequest(details: IRequest) {
    return axiosInstance.post<IRequest>("/requests", details);
  }

  getAll() {
    return axiosInstance.get<IRequest[]>("/requests");
  }
}

export const requestService = new RequestService();
