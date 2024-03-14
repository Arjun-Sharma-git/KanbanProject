import React, { useState } from "react";
import styles from "./Edit.module.css";
import moment from "moment";
import { editCard } from "../../apis/card";
import { useData } from "../../Context/dataContext";
import { useEditCard } from "../../Context/editContext";
import { useDuration } from "../../Context/DurationContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "react-calendar/dist/Calendar.css";
import deleteIcon from "../../assets/icons/Delete.png";
import Calendar from "../Calendar/Calendar";

function Edit({ cardData }) {
  const defaultTitle = cardData && cardData.title ? cardData.title : "";
  const defaultPriority =
    cardData && cardData.priority ? cardData.priority : "";
  const defaultChecklistItems =
    cardData && cardData.checkList ? cardData.checkList : [];
  const defaultSelectedDate =
    cardData && cardData.dueDate ? cardData.dueDate : "";

  const [title, setTitle] = useState(defaultTitle);
  const [priority, setPriority] = useState(defaultPriority);
  const [checklistItems, setChecklistItems] = useState(defaultChecklistItems);
  const [selectedDate, setSelectedDate] = useState(defaultSelectedDate);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const { fetchAllData } = useData();
  const { duration } = useDuration();
  const { updateTaskId } = useEditCard();

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handlePriorityChange = (e) => {
    setPriority(e.target.value);
  };

  const handleAddChecklistItem = () => {
    setChecklistItems([...checklistItems, { title: "", isChecked: false }]);
  };

  const handleChecklistItemChange = (index, field, value) => {
    const updatedItems = [...checklistItems];
    updatedItems[index] = { ...updatedItems[index], [field]: value };
    setChecklistItems(updatedItems);
  };

  const handleDeleteChecklistItem = (index) => {
    const updatedItems = [...checklistItems];
    updatedItems.splice(index, 1);
    setChecklistItems(updatedItems);
  };

  const handleCancel = () => {
    // closeEditModal();
    updateTaskId(null);
  };

  const handleSave = async (event) => {
    try {
      event.stopPropagation();
      await editCardHandler(
        cardData._id,
        title,
        priority,
        checklistItems,
        selectedDate
      );
      await fetchAllData(duration);
      updateTaskId(null);
    } catch (err) {
      toast.error(err.message);
    }
  };

  const handleDateChange = (value) => {
    setSelectedDate(value);
    setShowDatePicker(false);
  };

  const editCardHandler = async (
    taskId,
    title,
    priority,
    checklistItems,
    dueDate
  ) => {
    try {
      const finalDate = dueDate
        ? moment(dueDate).add(1, "day").subtract(2, "minutes").toISOString()
        : dueDate;
      const response = await editCard(
        taskId,
        title,
        priority,
        checklistItems,
        finalDate
      );
      toast.success("Card updated successfully", {
        autoClose: 1000,
        pauseOnHover: false,
      });
    } catch (err) {
      toast.error(err.message, { autoClose: 1000, pauseOnHover: false });
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
            />
            Low Priority
          </label>
        </div>
        <div className={styles.checkList}>
          <span className={styles.checkListTitle}>CheckList</span>
          <span className={styles.countDisplay}>
            ( {checklistItems.filter((item) => item.isChecked).length}/
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
                    checked={item.isChecked}
                    onChange={(e) =>
                      handleChecklistItemChange(
                        index,
                        "isChecked",
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
            <Calendar
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

export default Edit;
