import { ChakraProvider } from "@chakra-ui/react";
import Navbar from "./components/navbar";
import { fondantTheme } from "./styles/theme";

export const App = () => (
  <ChakraProvider theme={fondantTheme}>
    <Navbar />
  </ChakraProvider>
);
