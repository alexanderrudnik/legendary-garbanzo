import React from "react";
import { Input as ChakraInput, InputProps } from "@chakra-ui/react";

const BaseInput = React.forwardRef<any, InputProps>(({ ...props }, ref) => {
  return <ChakraInput ref={ref} focusBorderColor="primary" {...props} />;
});

export default BaseInput;
