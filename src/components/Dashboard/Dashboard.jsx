import React, { useState, useEffect } from "react";
import styles from "./Dashboard.module.css";
import Navpanel from "../Navpanel/navpanel";
import Board from "../Board/board";
import { useData } from "../../Context/dataContext";
import { useEditCard } from "../../Context/editContext";
import { useDeleteCard } from "../../Context/DeleteCardContext";
import SettingsPage from "../Settings/settings";
import Analytics from "../Analytics/analytics";
import LogOut from "../Logout/logOut";
import Delete from "../Delete/delete";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Create from "../CreateCard/createCard";
import Edit from "../Edit/Edit";

function Dashboard() {
  const [page, setPage] = useState("Board");
  const { showCreate } = useData();
  const { taskId } = useEditCard();
  const { delTaskId } = useDeleteCard();
  const changeBoard = (page) => {
    console.log(page);
    setPage(page);
  };
  const renderPage = () => {
    switch (page) {
      case "Board":
        return <Board />;
      case "Analytics":
        return <Analytics />;
      case "Settings":
        return <SettingsPage />;
      default:
        return null;
    }
  };
  return (
    <div className={styles.home}>
      <Navpanel changeBoard={changeBoard} />
      {renderPage()}
      {showCreate && <Create />}
      {taskId && <Edit cardData={taskId} />}
      {delTaskId && <Delete cardData={delTaskId} />}
    </div>
  );
}

export default Dashboard;
