import { useState } from "react";

const useVisualMode = function (initial) {
  // array with initial value
  const [history, setHistory] = useState([initial]);

  // transition from previous mode to new one (replace las element in history array with new mode)
  const transition = (newMode, replace = false) => {
    if (replace) {
      setHistory((prev) => [...prev.slice(0, prev.length - 1), newMode]);
    } else {
      setHistory(
        (prev) => [...prev, newMode] // add newMode to history
      );
    }
  };

  const back = () => {
    if (history.length > 1) {
      setHistory((prev) => [...prev.slice(0, prev.length - 1)]);
    }
  };

  const mode = history[history.length - 1];
  return { mode: mode, transition, back };
};

export default useVisualMode;
