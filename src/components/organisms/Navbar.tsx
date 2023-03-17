import React from "react";
import { useNavigate } from "react-router-dom";
export const Navbar = () => {
  const navigate = useNavigate();
  return (
    <div>
      <button onClick={() => navigate(`/`)}>Home Page</button>
      <button onClick={() => navigate(`/accounts`)}>Accounts</button>
    </div>
  );
};
