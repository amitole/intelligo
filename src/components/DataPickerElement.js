import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const DataPickerElement = ({ name, required, updateState }) => {
  const [startDate, setStartDate] = useState(new Date());

  const handleChange = (date) => {
    console.log(`data`, date);
    updateState({ [name]: date });
    // setStartDate(date);
  };

  return (
    <div>
      <div>{name}</div>
      <DatePicker
        selected={startDate}
        onChange={(date) => handleChange(date)}
      />
    </div>
  );
};

export default DataPickerElement;
