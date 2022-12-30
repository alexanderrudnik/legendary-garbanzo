import { extendTheme } from "@chakra-ui/react";

import { Container } from "@/common/components/BaseContainer/BaseContainer";

import { breakpoints } from "./breakpoints";
import { fontSizes } from "./fonts";
import { Button } from "@/common/components/BaseButton/BaseButton";

// To customize component styles please use `defineStyleConfig` in the component file, ref: https://chakra-ui.com/docs/styled-system/component-style

// To customize dark/light theme variables please use `mode`, ref: https://chakra-ui.com/docs/styled-system/customize-theme#customizing-global-styles

export const theme = extendTheme({
  colors: {
    primary: "#7AC7C4",
  },
  breakpoints,
  fontSizes,
  components: {
    Container,
    Button,
  },
});
