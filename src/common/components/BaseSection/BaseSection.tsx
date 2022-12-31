import React from "react";
import BaseBox, { BaseBoxProps } from "../BaseBox/BaseBox";

interface Props extends BaseBoxProps {
  defaultPadding?: boolean;
}

const BaseSection: React.FC<Props> = ({
  defaultPadding = true,
  children,
  ...props
}) => {
  return (
    <BaseBox
      as="section"
      {...(defaultPadding && { padding: "2rem 0" })}
      {...props}
    >
      {children}
    </BaseBox>
  );
};

export default BaseSection;
