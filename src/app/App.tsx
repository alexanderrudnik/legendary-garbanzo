import React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
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
import MyWorkspace from "@/features/workspace/pages/MyWorkspace";
import ForgotPassword from "@/features/auth/pages/ForgotPassword";

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
      {
        path: RouteEnum.MY_WORKSPACE,
        element: <MyWorkspace />,
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
      {
        path: RouteEnum.FORGOT_PASSWORD,
        element: <ForgotPassword />,
      },
    ],
  },
  {
    path: "*",
    element: <Navigate to={RouteEnum.HOME} />,
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
