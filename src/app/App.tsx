import React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClientProvider } from "react-query";
import { createStandaloneToast } from "@chakra-ui/toast";

import Home from "@/features/home/pages/Home";
import SignIn from "@/features/auth/pages/SignIn";
import AuthLayout from "@/layouts/AuthLayout/AuthLayout";
import MainLayout from "@/layouts/MainLayout/MainLayout";
import SignUp from "@/features/auth/pages/SignUp";
import Invite from "@/features/invite/pages/Invite";

import { RouteEnum } from "@/common/models/RouteEnum";
import { queryClient } from "@/common/queryClient/queryClient";
import { theme } from "./styles/theme/theme";

const { ToastContainer } = createStandaloneToast();

const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      {
        path: RouteEnum.HOME,
        element: <Home />,
      },
      {
        path: RouteEnum.INVITE,
        element: <Invite />,
      },
    ],
  },
  {
    element: <AuthLayout />,
    children: [
      {
        path: RouteEnum.SIGN_IN,
        element: <SignIn />,
      },
      {
        path: RouteEnum.SIGN_UP,
        element: <SignUp />,
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
