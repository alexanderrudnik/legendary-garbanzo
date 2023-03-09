import React from "react";
import { Input as ChakraInput, InputProps } from "@chakra-ui/react";
import { usePrimaryColor } from "@/common/hooks/usePrimaryColor";

export interface BaseInputProps extends InputProps {}

const BaseInput = React.forwardRef<any, InputProps>(({ ...props }, ref) => {
  const color = usePrimaryColor();

  return <ChakraInput ref={ref} focusBorderColor={color} {...props} />;
});

export default BaseInput;
