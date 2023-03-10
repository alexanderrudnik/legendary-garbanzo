import {
  Tag,
  TagCloseButton,
  TagLabel,
  TagProps,
  useColorModeValue,
} from "@chakra-ui/react";
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
  const color = useColorModeValue(
    "var(--chakra-colors-primary-700)",
    "var(--chakra-colors-primary-200)"
  );
  const bg = useColorModeValue(
    "var(--chakra-colors-primary-50)",
    "rgba(162, 216, 214, 0.16)"
  );

  return (
    <Tag color={color} background={bg} {...props}>
      <TagLabel>{children}</TagLabel>
      {close && <TagCloseButton onClick={onClose} />}
    </Tag>
  );
};

export default BaseTag;
