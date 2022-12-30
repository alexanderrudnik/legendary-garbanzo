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

interface Props {
  trigger: React.ReactNode;
  arrow?: boolean;
  close?: boolean;
  header?: React.ReactNode;
  children: React.ReactNode;
}

const BasePopover: React.FC<Props> = ({
  trigger,
  arrow,
  close,
  header,
  children,
}) => {
  return (
    <Popover>
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
