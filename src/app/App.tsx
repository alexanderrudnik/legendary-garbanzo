import React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import { QueryClientProvider } from "react-query";
import { createStandaloneToast } from "@chakra-ui/toast";

import SignIn from "@/features/auth/pages/SignIn";
import AuthLayout from "@/layouts/AuthLayout/AuthLayout";
import MainLayout from "@/layouts/MainLayout/MainLayout";
import SignUp from "@/features/auth/pages/SignUp";
import Invite from "@/features/invite/pages/Invite";
import MyWorkspace from "@/features/workspace/pages/MyWorkspace";
import ForgotPassword from "@/features/auth/pages/ForgotPassword";
import Proposals from "@/features/proposals/pages/Proposals";
import Requests from "@/features/requests/pages/Requests";

import { RouteEnum } from "@/common/models/RouteEnum";
import { queryClient } from "@/common/queryClient/queryClient";
import { theme } from "./styles/theme/theme";
import ContactUs from "@/features/contact-us/pages/ContactUs";
import Settings from "@/features/settings/pages/Settings";
import SingleRequest from "@/features/requests/pages/SingleRequest";
import SingleProposal from "@/features/proposals/pages/SingleProposal";
import EditRequest from "@/features/requests/pages/EditRequest";
import EditProposal from "@/features/proposals/pages/EditProposal";
import News from "@/features/news/pages/News";
import SendNotification from "@/features/send-notification/pages/SendNotification";

const { ToastContainer } = createStandaloneToast();

const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      {
        path: RouteEnum.HOME,
        element: <Navigate to={RouteEnum.REQUESTS} />,
      },
      {
        path: RouteEnum.NEWS,
        element: <News />,
      },
      {
        path: RouteEnum.PROPOSALS,
        element: <Proposals />,
      },
      {
        path: `${RouteEnum.PROPOSALS}/:id`,
        element: <SingleProposal />,
      },
      {
        path: `${RouteEnum.PROPOSALS}/edit/:id`,
        element: <EditProposal />,
      },
      {
        path: RouteEnum.REQUESTS,
        element: <Requests />,
      },
      {
        path: `${RouteEnum.REQUESTS}/:id`,
        element: <SingleRequest />,
      },
      {
        path: `${RouteEnum.REQUESTS}/edit/:id`,
        element: <EditRequest />,
      },
      {
        path: RouteEnum.INVITE,
        element: <Invite />,
      },
      {
        path: RouteEnum.MY_WORKSPACE,
        element: <MyWorkspace />,
      },
      {
        path: RouteEnum.SETTINGS,
        element: <Settings />,
      },
      {
        path: RouteEnum.CONTACT_US,
        element: <ContactUs />,
      },
      {
        path: RouteEnum.SEND_NOTIFICATION,
        element: <SendNotification />,
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
