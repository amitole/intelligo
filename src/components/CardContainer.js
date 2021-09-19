import React from "react";
import { Card, Form } from "react-bootstrap";

import FormElement from "./FormElement";

const CardContainer = ({ schemesList }) => {
  const [scheme, setScheme] = React.useState("");

  const handleChange = (event) => {
    setScheme(event.target.value);
  };

  const arr = schemesList.map((s) => (
    <option key={s.type} value={s.type}>
      {s.display}
    </option>
  ));
  return (
    <Card>
      <Form>
        {/* <InputLabel id="select-label">Scheme</InputLabel> */}
        <Form.Select
          //   labelId="select-label"
          id="select"
          value={scheme}
          label="Scheme"
          onChange={handleChange}
        >
          {!scheme ? <option></option> : ""}
          {arr}
        </Form.Select>
      </Form>
      {scheme ? <FormElement selected={scheme} /> : ""}
    </Card>
  );
};

export default CardContainer;
