import React from "react";
import BaseBox, { BaseBoxProps } from "../BaseBox/BaseBox";

interface Props extends BaseBoxProps {}

const BaseSection: React.FC<Props> = ({ children, ...props }) => {
  return (
    <BaseBox as="section" {...props}>
      {children}
    </BaseBox>
  );
};

export default BaseSection;
