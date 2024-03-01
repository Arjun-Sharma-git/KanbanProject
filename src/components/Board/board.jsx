import React, { useState, useEffect } from "react";
import { getAllCards } from "../../apis/card";
import DurationDropdown from "../DurationDropdown/DurationDropdown";
import { useDuration } from "../../Context/DurationContext";
import { useData } from "../../Context/dataContext";
import styles from "./board.module.css";
import Section from "../Section/section";
import moment from "moment";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Board() {
  const name = localStorage.getItem("userName");
  const currentDate = moment();
  const formattedDate = currentDate.format("Do MMM, YYYY");
  const { duration, updateDuration } = useDuration();
  const { data, keys, fetchAllData } = useData();
  useEffect(() => {
    fetchAllData(duration);
  }, [duration]);
  return (
    <div className={styles.board}>
      <div className={styles.headerContainer}>
        <div className={styles.header}>
          <div className={styles.titleName}>{`Welcome! ${name}`}</div>
          <div className={styles.date}>{formattedDate}</div>
        </div>
      </div>
      <div className={styles.headerContainer}>
        <div className={styles.header}>
          <div className={styles.titleBoard}>Board</div>
          <div className={styles.titleDuration}>
            <DurationDropdown />
          </div>
        </div>
      </div>
      <div className={styles.scrollContainer}>
        <div className={styles.scroll}>
          {keys &&
            data &&
            keys.map((k) => {
              return (
                <Section
                  key={k}
                  item={k}
                  // data={data[k]}
                  // fetchAllData={fetchAllData}
                />
              );
            })}
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Board;
