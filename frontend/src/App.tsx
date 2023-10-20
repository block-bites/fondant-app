import { useState, useEffect } from "react";
import { SearchProvider } from "./context/SearchContext";

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

  return (
    <ChakraProvider theme={fondantTheme}>
      <SearchProvider>
        <Router>
          <AppContent />
        </Router>
      </SearchProvider>
    </ChakraProvider>
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
        <Route path="/deploys" element={<div>Deploys</div>} />
        <Route path="/events" element={<div>Events</div>} />
        <Route path="/logs" element={<Logs />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
}