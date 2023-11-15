import { sampleData } from "./sampleData.js";
import ElderForegroundWorker from "../../services/ElderForegroundWorker";

const TestScreen = () => {
  const init = async () => {
    ElderForegroundWorker.start();
    const time = new Date().toLocaleTimeString();
    console.log(time);
    // const data = sampleData["activities-heart-intraday"].dataset;
    // const processedData = data.map((item) => {
    //   const { time, ...rest } = item;
    //   return { beatsPerMinute: time, ...rest };
    // });
    // console.log(processedData);
  };
  init();
};

export default TestScreen;
