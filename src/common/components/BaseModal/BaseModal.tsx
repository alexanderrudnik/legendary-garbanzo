import React from "react";
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  ModalProps,
} from "@chakra-ui/react";

interface Props extends ModalProps {
  header?: React.ReactNode;
  close?: boolean;
  footer?: React.ReactNode;
}

const BaseModal: React.FC<Props> = ({
  header,
  close = true,
  children,
  footer,
  ...props
}) => {
  return (
    <Modal {...props}>
      <ModalOverlay />
      <ModalContent>
        {header && <ModalHeader>{header}</ModalHeader>}
        {close && <ModalCloseButton />}
        <ModalBody paddingTop="1rem" paddingBottom="1rem">
          {children}
        </ModalBody>

        {footer && <ModalFooter>{footer}</ModalFooter>}
      </ModalContent>
    </Modal>
  );
};

export default BaseModal;
