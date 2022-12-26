import React from "react";
import {
  Container as ChakraContainer,
  defineStyleConfig,
} from "@chakra-ui/react";
import { breakpoints } from "@/app/styles/theme/breakpoints";

interface Props {
  children: React.ReactNode;
}

export const Container = defineStyleConfig({
  variants: {
    mobile: {
      maxWidth: breakpoints.sm,
    },
    tablet: {
      maxWidth: breakpoints.md,
    },
    desktop: {
      maxWidth: breakpoints.xl,
    },
  },
});

const BaseContainer: React.FC<Props> = ({ children }) => {
  return (
    <ChakraContainer
      variant={{
        base: "mobile",
        md: "tablet",
        xl: "desktop",
      }}
    >
      {children}
    </ChakraContainer>
  );
};

export default BaseContainer;
