import React from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  CardProps,
} from "@chakra-ui/react";

interface Props extends CardProps {
  header?: React.ReactNode;
  footer?: React.ReactNode;
}

const BaseCard: React.FC<Props> = ({ header, footer, children }) => {
  return (
    <Card>
      {header && <CardHeader>{header}</CardHeader>}

      <CardBody>{children}</CardBody>

      {footer && <CardFooter>{footer}</CardFooter>}
    </Card>
  );
};

export default BaseCard;
