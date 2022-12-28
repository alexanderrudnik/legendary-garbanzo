import React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClientProvider } from "react-query";
import { createStandaloneToast } from "@chakra-ui/toast";

import Home from "@/features/home/pages/Home";
import Login from "@/features/auth/pages/Login";
import AuthLayout from "@/layouts/AuthLayout/AuthLayout";

import { RouteEnum } from "@/common/models/RouteEnum";
import { queryClient } from "@/common/queryClient/queryClient";
import { theme } from "./styles/theme/theme";

const { ToastContainer } = createStandaloneToast();

const router = createBrowserRouter([
  {
    path: RouteEnum.HOME,
    element: <Home />,
  },
  {
    element: <AuthLayout />,
    children: [
      {
        path: RouteEnum.LOGIN,
        element: <Login />,
      },
    ],
  },
]);

export const App: React.FC = () => {
  return (
    <ChakraProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
        <ToastContainer />
      </QueryClientProvider>
    </ChakraProvider>
  );
};
