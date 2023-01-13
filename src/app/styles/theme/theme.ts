import { extendTheme, withDefaultColorScheme } from "@chakra-ui/react";

import { Container } from "@/common/components/BaseContainer/BaseContainer";

import { breakpoints } from "./breakpoints";
import { fontSizes } from "./fonts";

// To customize component styles please use `defineStyleConfig` in the component file, ref: https://chakra-ui.com/docs/styled-system/component-style

// To customize dark/light theme variables please use `mode`, ref: https://chakra-ui.com/docs/styled-system/customize-theme#customizing-global-styles

export const theme = extendTheme(
  {
    styles: {
      global: {
        body: {
          minWidth: breakpoints.sm,
        },
      },
    },
    colors: {
      primary: {
        50: "#bde3e2",
        100: "#afdddc",
        200: "#a2d8d6",
        300: "#95d2d0",
        400: "#87cdca",
        500: "#7ac7c4",
        600: "#6eb3b0",
        700: "#629f9d",
        800: "#558b89",
        900: "#497776",
      },
    },
    breakpoints,
    fontSizes,
    components: {
      Container,
    },
  },
  withDefaultColorScheme({ colorScheme: "primary" })
);
