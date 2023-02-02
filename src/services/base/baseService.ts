import { StorageEnum } from "@/common/models/StorageEnum";
import axios from "axios";
import createAuthRefreshInterceptor from "axios-auth-refresh";
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

const refreshAuthLogic = (failedRequest: any) =>
  axiosInstance
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
      failedRequest.response.config.headers["Authorization"] =
        "Bearer " + tokenRefreshResponse.data.idToken;
      return Promise.resolve();
    });

createAuthRefreshInterceptor(axiosInstance, refreshAuthLogic);
