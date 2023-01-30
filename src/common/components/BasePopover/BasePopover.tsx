import React from "react";
import {
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
} from "@chakra-ui/react";

export interface BasePopoverProps {
  trigger: React.ReactNode;
  arrow?: boolean;
  close?: boolean;
  header?: React.ReactNode;
  children: React.ReactNode;
  isOpen?: boolean;
  onClose?: () => void;
}

const BasePopover: React.FC<BasePopoverProps> = ({
  trigger,
  arrow,
  close,
  header,
  children,
  isOpen,
  onClose,
}) => {
  return (
    <Popover isOpen={isOpen} onClose={onClose}>
      <PopoverTrigger>{trigger}</PopoverTrigger>
      <PopoverContent>
        {arrow && <PopoverArrow />}

        {close && <PopoverCloseButton />}

        {header && <PopoverHeader>{header}</PopoverHeader>}

        <PopoverBody>{children}</PopoverBody>
      </PopoverContent>
    </Popover>
  );
};

export default BasePopover;
