import React, { useEffect } from "react";
import useInterval from "../hooks/interval";

const ElderForegroundWorker = (email: string, getHeartRate: any) => {
  let interval = null;
  const processData = () => {
    const timeInMinutes = new Date().getMinutes();
    // console.log("timeInMinutes", timeInMinutes);
  };

  const start = () => {
    interval = setInterval(() => {
      processData();
    }, 1000 * 60);
  };

  start();
};

export default ElderForegroundWorker;
