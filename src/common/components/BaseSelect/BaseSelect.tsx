import {
  Select,
  useColorModeValue,
  useTheme,
  SelectProps,
} from "@chakra-ui/react";
import React from "react";

const BaseSelect = React.forwardRef<any, SelectProps>(({ ...props }, ref) => {
  const theme = useTheme();

  const color = useColorModeValue(
    theme.colors.primary[500],
    theme.colors.primary[200]
  );

  return <Select ref={ref} focusBorderColor={color} {...props} />;
});

export default BaseSelect;
