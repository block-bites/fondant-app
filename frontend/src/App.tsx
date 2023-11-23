import { useState, useEffect } from "react";
import { SearchProvider } from "./context/SearchContext";
import { HelmetProvider } from "react-helmet-async";

import { ChakraProvider, HStack, Text } from "@chakra-ui/react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import { fondantTheme } from "./styles/theme";

import Navbar from "./components/organisms/navbar";
import Accounts from "./components/pages/accounts";
import Blocks from "./components/pages/blocks";
import Logs from "./components/pages/logs";
import Settings from "./components/pages/settings";
import Events from "./components/pages/events";
import Deploys from "./components/pages/deploys";

export const App = () => {
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [screenWidth, setScreenWidth] = useState<number>(0);

  // Set screen width state
  useEffect(() => {
    function handleResize() {
      setScreenWidth(window.innerWidth);
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Check device and screen width
  useEffect(() => {
    setIsMobile(
      /android|iphone|kindle|ipad/i.test(navigator.userAgent) ||
        window.innerWidth <= 768
    );
  }, [screenWidth]);

  if (isMobile) {
    return (
      <HStack width="100%" justify="center" fontSize="28px" fontWeight="600">
        <Text align="center">Used device and resolution not supported</Text>
      </HStack>
    );
  }

  return (
    <HelmetProvider>
      <ChakraProvider theme={fondantTheme}>
        <SearchProvider>
          <Router>
            <AppContent />
          </Router>
        </SearchProvider>
      </ChakraProvider>
    </HelmetProvider>
  );
};

function AppContent() {
  // we can move it to separate components
  const location = useLocation();
  const isSettingsPage = location.pathname === "/settings";

  return (
    <>
      {!isSettingsPage && <Navbar />}
      <Routes>
        <Route path="/" element={<Accounts />} />
        <Route path="/blocks" element={<Blocks />} />
        <Route path="/deploys" element={<Deploys />} />
        <Route path="/events" element={<Events />} />
        <Route path="/logs" element={<Logs />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
}
