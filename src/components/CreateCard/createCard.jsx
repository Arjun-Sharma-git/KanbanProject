import React, { useDebugValue, useState } from "react";
import styles from "./createCard.module.css";
import moment from "moment";
import { createCard } from "../../apis/card";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "react-calendar/dist/Calendar.css";
import { useData } from "../../Context/dataContext";
import { useDuration } from "../../Context/DurationContext";
import deleteIcon from "../../assets/icons/Delete.png";
import Calender from "../Calendar/Calendar";
function Create() {
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState("");
  const [checklistItems, setChecklistItems] = useState([]);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");
  const { toggleShowCreate, fetchAllData } = useData();
  const { duration } = useDuration();

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handlePriorityChange = (e) => {
    console.log(e.target.value);
    setPriority(e.target.value);
  };

  const handleAddChecklistItem = () => {
    setChecklistItems([...checklistItems, { title: "", isCompleted: false }]);
  };

  const handleChecklistItemChange = (index, field, value) => {
    const updatedItems = [...checklistItems];
    updatedItems[index] = { ...updatedItems[index], [field]: value };
    setChecklistItems(updatedItems);
  };

  const handleDeleteChecklistItem = (index) => {
    const updatedItems = [...checklistItems];
    console.log("before splice------------>", checklistItems);
    console.log(index);
    updatedItems.splice(index, 1);
    console.log("after splice--------------->", updatedItems);
    setChecklistItems(updatedItems);
  };

  const handleCancel = () => {
    toggleShowCreate(false);
  };

  const handleSave = async (event) => {
    try {
      event.stopPropagation();
      if (title.trim() == "") throw new Error("Title is required!");
      if (priority == "") throw new Error("priority is a required field");
      checklistItems.map((item) => {
        if (item.title.trim() == "") {
          throw new Error("Title of checklist should not be empty!");
        }
      });

      await createCardHandler(title, priority, checklistItems, selectedDate);
      await fetchAllData(duration);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleDateChange = (value) => {
    setSelectedDate(value);
    console.log("called", value);
    setShowDatePicker(false);
  };

  const createCardHandler = async (
    title,
    priority,
    checklistItems,
    dueDate
  ) => {
    try {
      const finalDate = dueDate
        ? moment(dueDate).add(1, "day").subtract(2, "minutes").toISOString()
        : dueDate;
      console.log("dueDate ", finalDate);
      const response = await createCard(
        title,
        priority,
        checklistItems,
        finalDate
      );
      toast.success("Card Created Successfully", {
        autoClose: 1000,
        pauseOnHover: false,
      });
      toggleShowCreate(false);
    } catch (err) {
      toast.error(err.message, {
        autoClose: 1000,
        pauseOnHover: false,
      });
    }
  };
  return (
    <div className={styles.create}>
      <div className={styles.box}>
        <p className={styles.title}>
          Title<span className={styles.required}>*</span>
        </p>
        <input
          className={styles.titleInput}
          name="title"
          placeholder="Enter Task Title"
          value={title}
          onChange={handleTitleChange}
        />
        <div className={styles.priority}>
          <div>
            Select Priority<span className={styles.required}>*</span>
          </div>
          <label
            style={{ background: priority === "high" ? "#EEECEC" : "white" }}
          >
            <input
              type="radio"
              name="priority"
              value="high"
              checked={priority === "high"}
              onChange={handlePriorityChange}
              style={{ accentColor: "#FF2473" }}
            />
            High Priority
          </label>
          <label
            style={{
              background: priority === "moderate" ? "#EEECEC" : "white",
            }}
          >
            <input
              type="radio"
              name="priority"
              value="moderate"
              checked={priority === "moderate"}
              onChange={handlePriorityChange}
              style={{ accentColor: "#18B0FF" }}
            />
            Moderate Priority
          </label>
          <label
            style={{
              background: priority === "low" ? "#EEECEC" : "white",
            }}
          >
            <input
              type="radio"
              name="priority"
              value="low"
              checked={priority === "low"}
              onChange={handlePriorityChange}
              style={{ accentColor: "#63C05B" }}
            />
            Low Priority
          </label>
        </div>
        <div className={styles.checkList}>
          <span className={styles.checkListTitle}>CheckList</span>
          <span className={styles.countDisplay}>
            ( {checklistItems.filter((item) => item.isCompleted).length}/
            {checklistItems.length})
          </span>
          <span className={styles.required}>*</span>
          <div className={styles.scrollContainer}>
            <div className={styles.scroll}>
              {checklistItems.map((item, index) => (
                <div key={index} className={styles.checkListItem}>
                  <input
                    className={styles.checkBox}
                    type="checkbox"
                    id={`item-${index}`}
                    checked={item.isCompleted}
                    onChange={(e) =>
                      handleChecklistItemChange(
                        index,
                        "isCompleted",
                        e.target.checked
                      )
                    }
                  />
                  <input
                    className={styles.checkListInput}
                    type="text"
                    value={item.title}
                    placeholder="Add a Task"
                    onChange={(e) =>
                      handleChecklistItemChange(index, "title", e.target.value)
                    }
                  />

                  <img
                    className={styles.deleteIcon}
                    src={deleteIcon}
                    onClick={() => handleDeleteChecklistItem(index)}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className={styles.addNew} onClick={handleAddChecklistItem}>
          + Add New
        </div>
        <div className={styles.footer}>
          <div className={styles.datePickerContainer}>
            <Calender
              selectedDate={selectedDate}
              handleDateChange={handleDateChange}
              onClose={() => setShowDatePicker(false)}
            />
          </div>

          <div className={styles.subfooter}>
            <div className={styles.cancel} onClick={handleCancel}>
              Cancel
            </div>
            <div className={styles.save} onClick={handleSave}>
              Save
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Create;
