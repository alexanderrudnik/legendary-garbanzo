import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
});

// axiosInstance.interceptors.request.use(async (config) => {
//   const accessToken = await Preferences.get({
//     key: StorageKeysEnum.ACCESS_TOKEN,
//   });

//   return {
//     ...config,
//     headers: {
//       ...config.headers,
//       "Content-Type": "application/json",
//       Authorization: accessToken.value ? `Bearer ${accessToken.value}` : "",
//     },
//   };
// });

axiosInstance.interceptors.response.use(
  (response) => response,
  async (e) => {
    const error = JSON.parse(JSON.stringify(e));

    // if (error.status === 401) {
    //   await Preferences.remove({ key: StorageKeysEnum.ACCESS_TOKEN });
    //   await queryClient.setQueryData(QueryKeysEnum.USER, null);
    // }

    const responseError = {
      ...error,
      message: e.response.data.message || e.message,
    };

    return Promise.reject(responseError);
  }
);
