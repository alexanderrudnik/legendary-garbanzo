import React from "react";
import {
  Input as ChakraInput,
  InputProps,
  useColorModeValue,
  useTheme,
} from "@chakra-ui/react";

const BaseInput = React.forwardRef<any, InputProps>(({ ...props }, ref) => {
  const theme = useTheme();

  const color = useColorModeValue(
    theme.colors.primary[500],
    theme.colors.primary[200]
  );

  return <ChakraInput ref={ref} focusBorderColor={color} {...props} />;
});

export default BaseInput;
