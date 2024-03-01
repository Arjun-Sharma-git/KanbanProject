import React, {
  useState,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from "react";
import { useDuration } from "../../Context/DurationContext";
import { useDeleteCard } from "../../Context/DeleteCardContext";
import { useClosePopupCard } from "../../Context/closePopup";

import { useData } from "../../Context/dataContext";
import styles from "./card.module.css";
import upArrow from "../../assets/icons/up.png";
import downArrow from "../../assets/icons/down.png";
import { statusChange, getCheckListCount } from "../../apis/card";
import Checkbox from "../Checkbox/Checkbox";
import Popup from "../Popup/Popup";
import moment from "moment";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEditCard } from "../../Context/editContext";
const Card = forwardRef(({ cardData }, ref) => {
  const [collapsed, setCollapsed] = useState(true);
  const [charLength, setCharLength] = useState(cardData.title.length);
  const [title, setTitle] = useState(cardData.title);
  const [checkListCount, setCheckListCount] = useState({});
  const [displayDueDate, setDisplayDueDate] = useState("");
  const [haveDueDate, setHaveDueDate] = useState(true);
  const [backgroundColor, setBackgroundColor] = useState("#cf3636");
  const [showPopup, setShowPopup] = useState(false);
  const { fetchAllData } = useData();
  const { updateOpen, isOpen } = useClosePopupCard();
  const { taskId, updateTaskId } = useEditCard();
  const { duration } = useDuration();
  const handleStatusChange = async (taskId, status) => {
    try {
      await statusChange(taskId, status);
      toast.success("Status of Task Changed  Successfully", {
        autoClose: 1000,
        pauseOnHover: false,
      });
      await fetchAllData(duration);
    } catch (err) {
      toast.error(err.message, { autoClose: 1000, pauseOnHover: false });
    }
  };

  const handleCollapseBtn = () => {
    setCollapsed(!collapsed);
  };

  useImperativeHandle(ref, () => ({
    collapse: () => {
      setCollapsed(true);
    },
  }));

  const fetchCheckListCount = async (taskId) => {
    try {
      const response = await getCheckListCount(taskId);
      setCheckListCount(response);
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };
  const dotHandler = (val) => {
    console.log("dcdf ", val);
    if (val) {
      setShowPopup(true);
    } else {
      setShowPopup(false);
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
    cardData.dueDate == null ? setHaveDueDate(false) : setHaveDueDate(true);
    console.log("length ", charLength);
    if (charLength >= 35) {
      const str = `${cardData.title.slice(0, 35)}...`;
      setTitle(str);
    }
    const dueDate = moment(cardData.dueDate);
    const currentDateMoment = moment();
    const isAfter = currentDateMoment.isAfter(dueDate);
    const color =
      cardData.status == "done" ? "#63c05b" : isAfter ? "#cf3636" : "#DBDBDB";
    setBackgroundColor(color);
    setDisplayDueDate(dueDate.format("MMM DD"));
    console.log(isAfter);
    fetchCheckListCount(cardData._id);
  }, [cardData]);
  const keys = ["toDo", "backlog", "inProgress", "done"];

  return (
    <div className={styles.card}>
      <div className={styles.cardheader}>
        <div className={styles.priority}>
          {" "}
          <div
            className={styles.bullet}
            style={{ backgroundColor: getBulletColor(cardData.priority) }}
          ></div>
          {`${cardData.priority} priority`}
        </div>
        <div onClick={() => dotHandler(true)}>
          <b className={styles.dots}>...</b>
          {showPopup && (
            <Popup
              cardData={cardData}
              hidePopup={dotHandler}
              showPopup={showPopup}
            />
          )}
        </div>
      </div>
      <div className={styles.cardTitle} title={cardData.title}>
        {title}
      </div>
      <div className={styles.checkListContainer}>
        <div className={styles.checkListCount}>
          <div className={styles.checkListCountTitle}>
            CheckList ({checkListCount?.completedChecklistItems}/
            {checkListCount?.totalChecklistItems})
          </div>
          <div className="collapseIcon" onClick={handleCollapseBtn}>
            <img src={collapsed ? downArrow : upArrow} alt="logo" />
          </div>
        </div>
        <div className={styles.checkListDropdown}>
          {!collapsed &&
            cardData &&
            cardData.checkList &&
            cardData.checkList.map((item) => {
              console.log("cardData ", cardData._id);
              return (
                <Checkbox key={item._id} item={item} TaskId={cardData._id} />
              );
            })}
        </div>
      </div>
      <div className={styles.cardFooter}>
        <div>
          {haveDueDate && (
            <div
              style={{ backgroundColor: backgroundColor }}
              className={styles.date}
            >
              {displayDueDate}
            </div>
          )}
        </div>
        <div className={styles.switchSection}>
          {keys.map((key) => {
            if (!cardData.status.includes(key)) {
              return (
                <div
                  key={key}
                  className={styles.sectionBtn}
                  onClick={() => handleStatusChange(cardData._id, key)}
                >
                  {key}
                </div>
              );
            }
          })}
        </div>
      </div>
    </div>
  );
});
export default Card;
