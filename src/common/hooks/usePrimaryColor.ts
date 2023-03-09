import { useColorModeValue } from "@chakra-ui/react";

export const usePrimaryColor = () => {
  const color = useColorModeValue("primary.500", "primary.200");

  return color;
};
