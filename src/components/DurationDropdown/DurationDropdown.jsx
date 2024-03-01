import React, { useState, useEffect } from "react";
import { useDuration } from "../../Context/DurationContext";

function DurationDropdown() {
  const { duration, updateDuration } = useDuration();

  const handleChange = (event) => {
    const newDuration = event.target.value;
    updateDuration(newDuration);
  };

  return (
    <div>
      <select
        style={{ borderStyle: "none", outline: "none" }}
        id="dropdown"
        value={duration}
        onChange={handleChange}
      >
        <option value="week">This week</option>
        <option value="month">This month</option>
        <option value="day">Today</option>
      </select>
    </div>
  );
}

export default DurationDropdown;
