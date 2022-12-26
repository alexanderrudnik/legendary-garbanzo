import { extendTheme } from "@chakra-ui/react";

import { Container } from "@/common/components/BaseContainer/BaseContainer";

import { breakpoints } from "./breakpoints";
import { fontSizes } from "./fonts";

// To customize component styles please use `defineStyleConfig` in the component file, ref: https://chakra-ui.com/docs/styled-system/component-style

// To customize dark/light theme variables please use `mode`, ref: https://chakra-ui.com/docs/styled-system/customize-theme#customizing-global-styles

export const theme = extendTheme({
  breakpoints,
  fontSizes,
  components: {
    Container,
  },
});
