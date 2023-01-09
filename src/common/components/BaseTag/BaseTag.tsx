import { Tag, TagCloseButton, TagLabel, TagProps } from "@chakra-ui/react";
import React from "react";

interface Props extends TagProps {
  close?: boolean;
  onClose?: () => void;
}

const BaseTag: React.FC<Props> = ({
  close = false,
  onClose,
  children,
  ...props
}) => {
  return (
    <Tag {...props}>
      <TagLabel>{children}</TagLabel>
      {close && <TagCloseButton onClick={onClose} />}
    </Tag>
  );
};

export default BaseTag;
