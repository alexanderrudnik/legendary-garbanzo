import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertProps,
  AlertTitle,
} from "@chakra-ui/react";
import React from "react";

export interface BaseAlertProps extends AlertProps {
  title: string;
  message: string;
}

const BaseAlert: React.FC<BaseAlertProps> = ({ title, message, ...props }) => {
  return (
    <Alert {...props}>
      <AlertIcon />
      <AlertTitle>{title}</AlertTitle>
      <AlertDescription>{message}</AlertDescription>
    </Alert>
  );
};

export default BaseAlert;
