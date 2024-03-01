import * as React from "react";
import { useState, useEffect } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import dayjs from "dayjs";
import moment from "moment";
const theme = createTheme({
  components: {
    // Name of the component

    MuiInputBase: {
      styleOverrides: {
        root: {
          height: "2.7rem",
        },
        input: {
          "&::placeholder": {
            color: "red", // Change placeholder color to red
          },
        },
      },
    },
    MuiStack: {
      styleOverrides: {
        root: {
          overflow: "hidden !important",
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          // Your styles for error state here
          color: "#707070 !important", // Example: Changing border color to red
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: "#707070 !important", // Example: Changing border color to red
          },
        },
      },
    },
  },
});

export default function Calendar({ selectedDate, handleDateChange }) {
  const handleChange = (date) => {
    console.log("date ", date);
    handleDateChange(date); // Pass the selected date to the handleDateChange method
  };
  return (
    <ThemeProvider theme={theme}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoContainer components={["MobileDatePicker"]}>
          <MobileDatePicker
            label={"Select Due Date"}
            defaultValue={dayjs(selectedDate)} //only use dayjs for default value for this calander libarary
            format={"DD/MM/YYYY"}
            onChange={handleChange}
          />
        </DemoContainer>
      </LocalizationProvider>
    </ThemeProvider>
  );
}
