import { useState, useEffect } from "react";

import { ChakraProvider, HStack, Text } from "@chakra-ui/react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { fondantTheme } from "./styles/theme";

import Navbar from "./components/organisms/navbar";
import Accounts from "./components/pages/accounts";
import Blocks from "./components/pages/blocks";

export const App = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(
      /android|iphone|kindle|ipad/i.test(navigator.userAgent) ||
        window.innerWidth < 768
    );
  }, [window.innerWidth]);

  if (isMobile) {
    return (
      <HStack width="100%" justify="center" fontSize="28px" fontWeight="600">
        <Text align="center">Used device and resolution is unsupported</Text>
      </HStack>
    );
  }

  return (
    <ChakraProvider theme={fondantTheme}>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Accounts />} />
          <Route path="/blocks" element={<Blocks />} />
          <Route path="/deploys" element={<div>Dploys</div>} />
          <Route path="/events" element={<div>Events</div>} />
          <Route path="/logs" element={<div>Logs</div>} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </ChakraProvider>
  );
};
