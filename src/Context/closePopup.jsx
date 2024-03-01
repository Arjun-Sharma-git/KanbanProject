import React, { createContext, useState, useContext } from "react";
const ClosePopupContext = createContext();
export const useClosePopupCard = () => useContext(ClosePopupContext);
export const ClosePopupProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const updateOpen = (status, val) => {
    console.log("called", status, val);
    setIsOpen(status);
  };

  return (
    <ClosePopupContext.Provider value={{ isOpen, updateOpen }}>
      {children}
    </ClosePopupContext.Provider>
  );
};
