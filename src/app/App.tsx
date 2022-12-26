import React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import { theme } from "./styles/theme/theme";

export const App: React.FC = () => (
  <ChakraProvider theme={theme}></ChakraProvider>
);
