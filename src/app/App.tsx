import React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Login from "@/features/auth/pages/Login";

import { theme } from "./styles/theme/theme";
import { RouteEnum } from "@/common/models/RouteEnum";
import AuthLayout from "@/layouts/AuthLayout/AuthLayout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <div>Hello world!</div>,
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

export const App: React.FC = () => (
  <ChakraProvider theme={theme}>
    <RouterProvider router={router} />
  </ChakraProvider>
);
