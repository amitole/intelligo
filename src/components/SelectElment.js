import React from "react";
import { Form } from "react-bootstrap";

const SelectElment = ({ name, enumValues, updateState }) => {

  const handleChange = (event) => {
    updateState({ [name]: event.target.value });
  };

  let options = enumValues.map((optin, i) => (
    <option key={i} value={optin}>
      {optin}
    </option>
  ));

  return (
    <Form.Group className="mb-3 amit" controlId="formBasicEmail">
      <Form.Label>{name}</Form.Label>
      <Form.Select aria-label={name} onChange={handleChange}>
        {options}
      </Form.Select>
    </Form.Group>
  );
};

export default SelectElment;
