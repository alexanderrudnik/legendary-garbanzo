import { Button as BaseButton, defineStyleConfig } from "@chakra-ui/react";

export const Button = defineStyleConfig({
  variants: {
    solid: {
      background: "primary",
      color: "white",
      transition: "all 0.3s ease",
      _hover: {
        background: "primary",
        filter: "brightness(110%)",
      },
      _active: {
        background: "primary",
        filter: "brightness(90%)",
      },
    },
  },
});

export default BaseButton;
