import React from "react";
import {
  Textarea,
  TextareaProps,
  useColorModeValue,
  useTheme,
} from "@chakra-ui/react";

export interface BaseTextAreaProps extends TextareaProps {}

const BaseTextArea = React.forwardRef<any, BaseTextAreaProps>(
  ({ ...props }, ref) => {
    const theme = useTheme();

    const color = useColorModeValue(
      theme.colors.primary[500],
      theme.colors.primary[200]
    );

    return <Textarea ref={ref} focusBorderColor={color} {...props} />;
  }
);

export default BaseTextArea;
