import React, { createContext, useState, useContext } from "react";

// Create a new context
const DurationContext = createContext();

// Create a custom hook to access the context
export const useDuration = () => useContext(DurationContext);

// Create a provider component
export const DurationProvider = ({ children }) => {
  const [duration, setDuration] = useState("week");

  const updateDuration = (newDuration) => {
    setDuration(newDuration);
  };

  return (
    <DurationContext.Provider value={{ duration, updateDuration }}>
      {children}
    </DurationContext.Provider>
  );
};
