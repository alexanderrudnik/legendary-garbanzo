import React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClientProvider } from "react-query";
import { createStandaloneToast } from "@chakra-ui/toast";

import Home from "@/features/home/pages/Home";
import SignIn from "@/features/auth/pages/SignIn";
import AuthLayout from "@/layouts/AuthLayout/AuthLayout";

import { RouteEnum } from "@/common/models/RouteEnum";
import { queryClient } from "@/common/queryClient/queryClient";
import { theme } from "./styles/theme/theme";
import MainLayout from "@/layouts/MainLayout/MainLayout";

const { ToastContainer } = createStandaloneToast();

const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      {
        path: RouteEnum.HOME,
        element: <Home />,
      },
    ],
  },
  {
    element: <AuthLayout />,
    children: [
      {
        path: RouteEnum.LOGIN,
        element: <SignIn />,
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
