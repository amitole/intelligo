import React from "react";
import { Form } from "react-bootstrap";
import "./InputElement.css";

const InputElement = ({ name, required, updateState }) => {
  const [value, setValue] = React.useState("");

  const handleChange = (event) => {
    console.log(`value`, event.target.value);
    // setValue(event.target.value);
    // console.log(`updatestate`, updateState);
    // updateState("helloe");
    updateState({ [name]: event.target.value });
  };

  return (
    <Form.Group className="mb-3 amit" controlId="formBasicEmail">
      <Form.Label>{name}</Form.Label>
      <Form.Control
        className="textFeild"
        type="text"
        // onChange={updateState(event.target.value)}
        onChange={handleChange}
        placeholder={`Enter ${name} here..`}
      />
    </Form.Group>
  );
};

export default InputElement;
