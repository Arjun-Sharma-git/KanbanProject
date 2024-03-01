import React, { useState, useEffect } from "react";
import styles from "./Checkbox.module.css";
import { editCheckList } from "../../apis/card";
import { toast } from "react-toastify";
import { useData } from "../../Context/dataContext";
import { useDuration } from "../../Context/DurationContext";
// import { useDuration } from "../../Context/DurationContext";
const Checkbox = ({ item, TaskId, disabled }) => {
  const { updateCheckListCountToggle, fetchAllData } = useData();
  const { duration } = useDuration();
  const [isChecked, setIsChecked] = useState(item.isCompleted);
  const handleCheckboxChange = async (event, itemId, TaskId) => {
    if (disabled) {
      return;
    }
    const prevValue = isChecked;
    try {
      setIsChecked(event.target.checked);
      await editCheckList(TaskId, itemId, event.target.checked);
      await fetchAllData(duration);
    } catch (error) {
      setIsChecked(prevValue);
      toast.error(error.message);
    }
  };
  return (
    <div className={styles.checkBox}>
      <div className={styles.checkBoxBoolean}>
        <input
          className={styles.checkBoxInput}
          type="checkbox"
          id={item._id}
          name={item.title}
          checked={isChecked}
          value={isChecked}
          onChange={(e) => {
            handleCheckboxChange(e, item._id, TaskId);
          }}
        />
      </div>
      <div className={styles.checkBoxTitle}>{item.title}</div>
    </div>
  );
};

export default Checkbox;
