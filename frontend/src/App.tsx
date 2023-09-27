import { ChakraProvider } from "@chakra-ui/react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { fondantTheme } from "./styles/theme";

import Navbar from "./components/organisms/navbar";
import Accounts from "./components/pages/accounts";

export const App = () => (
  <ChakraProvider theme={fondantTheme}>
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Accounts />} />
        <Route path="/blocks" element={<div>Blocks</div>} />
        <Route path="/deploys" element={<div>Dploys</div>} />
        <Route path="/events" element={<div>Events</div>} />
        <Route path="/logs" element={<div>Logs</div>} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  </ChakraProvider>
);
