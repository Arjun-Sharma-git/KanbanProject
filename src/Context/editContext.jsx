import React, { createContext, useState, useContext } from "react";
import { deleteCard } from "../apis/card";
const EditCardContext = createContext();
export const useEditCard = () => useContext(EditCardContext);
export const EditCardProvider = ({ children }) => {
  const [taskId, setTaskId] = useState(null);
  const [key, setKey] = useState(null);
  const updateTaskId = (taskId) => {
    setTaskId(taskId);
  };
  const updateKey = (val) => {
    setKey(val);
  };

  return (
    <EditCardContext.Provider value={{ taskId, updateTaskId, key, updateKey }}>
      {children}
    </EditCardContext.Provider>
  );
};
