import { useEffect, useState } from "react";

// export const useDebounce = (func: any, delay: number) => {
//   const [debouncedFunction, setDebouncedFunction] = useState(func);

//   useEffect(() => {
//     const timeout = setTimeout(() => {
//       setDebouncedFunction(func);
//     }, delay);

//     return () => clearTimeout(timeout);
//   }, [func, delay]);

//   return debouncedFunction;
// };

const useDebouce = (callback: any, delay: number) => {
  let timer: any;
  return (...args: any) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      callback(...args);
    }, delay);
  };
};

export default useDebouce;
