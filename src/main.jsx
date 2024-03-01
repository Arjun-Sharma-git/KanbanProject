import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { DurationProvider } from "./Context/DurationContext.jsx";
import { DataProvider } from "./Context/dataContext.jsx";
import { DeleteCardProvider } from "./Context/DeleteCardContext.jsx";
import { EditCardProvider } from "./Context/editContext.jsx";
import { ClosePopupProvider } from "./Context/closePopup.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <DurationProvider>
    <DataProvider>
      <DeleteCardProvider>
        <EditCardProvider>
          <ClosePopupProvider>
            <App />
          </ClosePopupProvider>
        </EditCardProvider>
      </DeleteCardProvider>
    </DataProvider>
  </DurationProvider>
);
