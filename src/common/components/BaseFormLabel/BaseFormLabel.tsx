import React from "react";
import { FormLabel, FormLabelProps } from "@chakra-ui/react";

export interface BaseFormLabelProps extends FormLabelProps {}

const BaseFormLabel: React.FC<BaseFormLabelProps> = ({ ...props }) => {
  return <FormLabel display="inline-block" {...props} />;
};

export default BaseFormLabel;
