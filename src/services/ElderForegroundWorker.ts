import React, { useEffect } from "react";
import useInterval from "../hooks/interval";

const ElderForegroundWorker = (email: string, getHeartRate: any) => {
  let interval = null;
  const processData = () => {
    const timeInMinutes = new Date().getSeconds();
    // console.log("timeInMinutes", timeInMinutes);
    if (timeInMinutes % 10 === 0) {
      //console.log(timeInMinutes);
    }
  };

  const start = () => {
    interval = setInterval(() => {
      processData();
    }, 1000 * 1);
  };

  start();
};

export default ElderForegroundWorker;
