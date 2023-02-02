import { QueryKeysEnum } from "@/common/models/QueryKeysEnum";
import { StorageEnum } from "@/common/models/StorageEnum";
import { queryClient } from "@/common/queryClient/queryClient";
import axios from "axios";
import { toastService } from "../toast/toastService";
import { storageService } from "../storage/storageService";

export const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
});

axiosInstance.interceptors.request.use(async (config) => {
  const accessToken = storageService.get(StorageEnum.ACCESS_TOKEN);

  return {
    ...config,
    headers: {
      ...config.headers,
      "Content-Type": "application/json",
      Authorization: accessToken ? `Bearer ${accessToken}` : "",
    },
  } as any;
});

axiosInstance.interceptors.response.use(
  (response) => response,
  async (e) => {
    const error = JSON.parse(JSON.stringify(e));

    if (error.status === 401) {
      toastService.show({
        title: "An error occured",
        description: e.response.data.message || "Unathorized",
        status: "error",
      });
      await storageService.remove(StorageEnum.ACCESS_TOKEN);
      await queryClient.setQueryData(QueryKeysEnum.ME, null);
    }

    const responseError = {
      ...error,
      message: e.response.data.message || e.message,
    };

    return Promise.reject(responseError);
  }
);
