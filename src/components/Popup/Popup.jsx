import React, { useState, useRef, useEffect } from "react";
import styles from "../Popup/Popup.module.css";
import Delete from "../Delete/delete";
import Edit from "../Edit/Edit";
import { useEditCard } from "../../Context/editContext";
import { useDeleteCard } from "../../Context/DeleteCardContext";
import { useClosePopupCard } from "../../Context/closePopup";
import { ToastContainer, toast } from "react-toastify";
import { useLocation } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

const Popup = ({ cardData, hidePopup, showPopup }) => {
  const { updateOpen } = useClosePopupCard();
  const { updateDelTaskId } = useDeleteCard();
  let count = 0;
  const { updateTaskId, updateKey } = useEditCard();

  const currentUrl = window.location.href;

  const openDeleteModal = (event) => {
    updateDelTaskId(cardData);
    console.log("calling ");
    hidePopup(false);
    event.stopPropagation();

    updateOpen(false, "del");
  };

  const openEditModal = (event) => {
    event.stopPropagation();
    updateTaskId(cardData);
    hidePopup(false);
  };
  const divRef = useRef(null);
  const handleClickOutside = (event) => {
    if (
      count % 2 !== 0 &&
      divRef.current &&
      !divRef.current.contains(event.target)
    ) {
      hidePopup(false);
    }
    count = count + 1;
  };
  const copyToClipboard = async (url) => {
    try {
      await navigator.clipboard.writeText(url);
      toast.success("Link Copied", {
        autoClose: 1000,
        pauseOnHover: false,
      });
    } catch (error) {
      toast.error(err.message, {
        autoClose: 1000,
        pauseOnHover: false,
      });
    }
  };

  useEffect(() => {
    console.log(currentUrl);
    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);
  return (
    <div className={styles.popupContainer} ref={divRef}>
      <div className={styles.crudOptions} onClick={openEditModal}>
        Edit
      </div>
      <div
        className={styles.crudOptions}
        onClick={(event) => {
          event.stopPropagation();
          copyToClipboard(`${currentUrl}/task/${cardData._id}`);
          updateOpen(false);
          hidePopup(false);
        }}
      >
        Share
      </div>
      <div
        className={styles.crudOptions}
        style={{ color: "#CF3636" }}
        onClick={openDeleteModal}
      >
        Delete
      </div>
    </div>
  );
};

export default Popup;
