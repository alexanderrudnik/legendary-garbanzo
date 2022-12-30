import {
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerProps,
} from "@chakra-ui/react";
import React from "react";

interface Props extends DrawerProps {
  close?: boolean;
  header?: React.ReactNode;
  footer?: React.ReactNode;
}

const BaseDrawer: React.FC<Props> = ({
  close = true,
  header,
  children,
  footer,
  ...props
}) => {
  return (
    <Drawer {...props}>
      <DrawerOverlay />
      <DrawerContent>
        {close && <DrawerCloseButton />}

        {header && <DrawerHeader>{header}</DrawerHeader>}

        <DrawerBody>{children}</DrawerBody>

        {footer && <DrawerFooter>{footer}</DrawerFooter>}
      </DrawerContent>
    </Drawer>
  );
};

export default BaseDrawer;
