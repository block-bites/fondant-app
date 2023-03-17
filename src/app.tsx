import * as ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import { AppRoutes } from "./routes/Routes";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <Router>
    <AppRoutes />
  </Router>
);
