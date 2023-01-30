import { RequestInputs } from "@/features/requests/models/RequestInputs";
import { axiosInstance } from "../base/baseService";
import { IRequest } from "./types";

class RequestService {
  createRequest(details: IRequest) {
    return axiosInstance.post<IRequest>("/requests", details);
  }

  editRequest(details: RequestInputs, id: string) {
    return axiosInstance.put<IRequest>(`/requests/${id}`, details);
  }

  deleteRequest(id: string) {
    return axiosInstance.delete<IRequest>(`/requests/${id}`);
  }

  getAll() {
    return axiosInstance.get<IRequest[]>("/requests");
  }
}

export const requestService = new RequestService();
