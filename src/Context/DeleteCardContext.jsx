import React, { createContext, useState, useContext } from "react";
const DeleteCardContext = createContext();
export const useDeleteCard = () => useContext(DeleteCardContext);
export const DeleteCardProvider = ({ children }) => {
  const [delTaskId, setDelTaskId] = useState(null);
  const updateDelTaskId = (taskId) => {
    setDelTaskId(taskId);
  };

  return (
    <DeleteCardContext.Provider value={{ delTaskId, updateDelTaskId }}>
      {children}
    </DeleteCardContext.Provider>
  );
};
