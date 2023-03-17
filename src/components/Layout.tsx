import React from "react";
import { Navbar } from "./organisms/Navbar";

interface IProps {
  children: React.ReactNode;
}

export const Layout = ({ children }: IProps) => {
  return (
    <div className="App">
      <Navbar />
      {children}
    </div>
  );
};
