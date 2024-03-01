import React, { useState, useEffect } from "react";
import styles from "./public.module.css";
import { getCheckListCount } from "../../apis/card";
import Checkbox from "../Checkbox/Checkbox";
import moment from "moment";
import { ToastContainer, toast } from "react-toastify";
import { useParams } from "react-router-dom";
import { getSingleCard } from "../../apis/card";
import ProMangage from "../../assets/icons/ProManage.png";
import "react-toastify/dist/ReactToastify.css";

function Public() {
  const [haveDueDate, setHaveDueDate] = useState(true);
  const { taskId } = useParams();
  const [cardData, setCardData] = useState(null);
  const [checkListCount, setCheckListCount] = useState({});
  const [displayDueDate, setDisplayDueDate] = useState("");
  const [backgroundColor, setBackgroundColor] = useState("#cf3636");
  const [titleShow, setTitleShow] = useState("");

  const fetchCheckListCount = async (taskId) => {
    try {
      console.log(taskId);
      const response = await getCheckListCount(taskId);
      setCheckListCount(response);
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const getBulletColor = (priority) => {
    switch (priority) {
      case "high":
        return "#FF2473";
      case "moderate":
        return "#18B0FF";
      case "low":
        return "#63C05B";
      default:
        return "gray";
    }
  };

  useEffect(() => {
    fetchCardDetails(taskId);
    fetchCheckListCount(taskId);
  }, []);

  const fetchCardDetails = async (taskId) => {
    try {
      const response = await getSingleCard(taskId);
      console.log("isAfter ", response);
      setCardData(response);
      console.log(response);
      if (response?.title.length >= 35) {
        const str = `${response.title.slice(0, 35)}...`;
        setTitleShow(str);
      }
      response?.dueDate == null ? setHaveDueDate(false) : setHaveDueDate(true);
      const dueDate = moment(response?.dueDate);
      const currentDateMoment = moment();
      const isAfter = currentDateMoment.isAfter(dueDate);
      const color =
        cardData?.status == "done"
          ? "#63c05b"
          : isAfter
          ? "#cf3636"
          : "#DBDBDB";
      setBackgroundColor(color);
      setDisplayDueDate(dueDate.format("MMM DD"));
    } catch (error) {
      console.log(error);
      toast.error(error.message, { autoClose: 1000 });
    }
  };

  return (
    <div className={styles.cardContainer}>
      <div className={styles.logo}>
        <div className={styles.logoChild}>
          <img src={ProMangage} alt="logo" />
          <div className={styles.titleMain}>Pro Manage</div>{" "}
        </div>
      </div>
      <div className={styles.card}>
        <div className={styles.cardheader}>
          <div className={styles.priority}>
            {" "}
            <div
              className={styles.bullet}
              style={{ backgroundColor: getBulletColor(cardData?.priority) }}
            ></div>
            {`${cardData?.priority} priority`}
          </div>
        </div>
        <div className={styles.cardTitle} title={cardData?.title}>
          {titleShow}
        </div>
        <div className={styles.checkListContainer}>
          <div className={styles.checkListCount}>
            <div className={styles.checkListCountTitle}>
              CheckList ({checkListCount?.completedChecklistItems}/
              {checkListCount?.totalChecklistItems})
            </div>
          </div>
          <div className={styles.checkListScrollContainer}>
            <div className={styles.checkListScroll}>
              {cardData &&
                cardData.checkList &&
                cardData.checkList.map((item) => {
                  console.log("cardData ", cardData._id);
                  return (
                    <Checkbox
                      key={item._id}
                      item={item}
                      TaskId={cardData._id}
                      disabled={true}
                    />
                  );
                })}
            </div>
          </div>
        </div>
        <div className={styles.cardFooter}>
          <div>
            {haveDueDate && (
              <div className={styles.dueDate}>
                <div>Due Date</div>
                <div
                  style={{ backgroundColor: backgroundColor }}
                  className={styles.date}
                >
                  {displayDueDate}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Public;
