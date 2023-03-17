import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Link,
} from "react-router-dom";
import { AccountsPage } from "../pages/Accounts";
import { HomePage } from "../pages/HomePage";

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />}></Route>
      <Route path="/accounts" element={<AccountsPage />}></Route>
      {/* Redirect if no page */}
      <Route path="*" element={<Navigate to="/" replace />}></Route>
    </Routes>
  );
};
