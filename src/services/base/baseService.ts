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
    const originalRequest = e.config;
    if (e.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const accessToken = await refreshAccessToken();
      axios.defaults.headers.common["Authorization"] = "Bearer " + accessToken;
      return axiosInstance(originalRequest);
    } else {
      const error = JSON.parse(JSON.stringify(e));

      const responseError = {
        ...error,
        message: e.response.data.message || e.message,
      };

      return Promise.reject(responseError);
    }
  }
);

const refreshAccessToken = async () => {
  return axiosInstance
    .post("/refresh-token", {
      token: storageService.get(StorageEnum.REFRESH_TOKEN),
    })
    .then((tokenRefreshResponse) => {
      storageService.set(
        StorageEnum.ACCESS_TOKEN,
        tokenRefreshResponse.data.idToken
      );
      storageService.set(
        StorageEnum.REFRESH_TOKEN,
        tokenRefreshResponse.data.refreshToken
      );

      return tokenRefreshResponse.data.idToken;
    })
    .catch(async (e) => {
      await storageService.remove(StorageEnum.ACCESS_TOKEN);
      await queryClient.setQueryData(QueryKeysEnum.ME, null);
      toastService.show({
        title: "An error occured",
        description: "Please, log in again to continue",
        status: "error",
      });
    });
};
