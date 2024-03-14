import React, { useEffect } from "react";

interface IRefresherProps {
  children: React.ReactNode;
  interval: number;
  onRefresh: () => void;
}

const Refresher = ({ children, interval, onRefresh }: IRefresherProps) => {
  useEffect(() => {
    const intervalId = setInterval(() => {
      onRefresh();
    }, interval * 1000);

    return () => clearInterval(intervalId);
  }, [interval, onRefresh]);

  return <>{children}</>;
};

export default Refresher;
