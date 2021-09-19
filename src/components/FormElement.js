import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import axios from "axios";
import InputElement from "./InputElement";
import SelectElment from "./SelectElment";
import DataPickerElement from "./DataPickerElement";
import SubForm from "./SubForm";

const Form = ({ selected }) => {
  const [data, setData] = useState([]);

  const [formState, setFormState] = useState({});

  useEffect(() => {
    const getData = async () => {
      // setloading(true);
      const res = await axios(
        `https://clarityapi.intelligo.ai/api/v1/schemas/${selected}`
      );

      let scheme = res.data.result.scheme;

      let result = Object.keys(scheme).map((key) => {
        if (typeof scheme[key] === "string") {
          return [key, JSON.parse(scheme[key])];
        } else {
          return [key, scheme[key]];
        }
      });
      // console.log(`result`, result);
      setData(result);
    };

    getData();
  }, [selected]);

  const handleState = (value) => {
    // debugger;
    console.log(`handleState`, value);
    setFormState({ ...formState, ...value });
    console.log(`formState`, formState);
  };

  let rows;

  if (data) {
    rows = data.map((row, i) => {
      if (row[1].type) {
        if (row[1].type === "String") {
          if (row[1].require) {
            return (
              <InputElement
                updateState={handleState}
                key={i}
                name={row[0]}
                required={true}
              />
            );
          } else {
            return (
              <InputElement
                updateState={handleState}
                key={i}
                name={row[0]}
                required={false}
              />
            );
          }
        }
        if (row[1].type === "Date") {
          if (row[1].require) {
            return (
              <DataPickerElement
                updateState={handleState}
                key={i}
                name={row[0]}
                required={true}
              />
            );
          } else {
            return (
              <DataPickerElement
                updateState={handleState}
                key={i}
                name={row[0]}
                required={false}
              />
            );
          }
        }
        if (row[1].type === "Enum") {
          if (row[1].require) {
            return (
              <SelectElment
                key={i}
                name={row[0]}
                enumValues={row[1].enumValues}
                required={true}
                updateState={handleState}
              />
            );
          } else {
            return (
              <SelectElment
                key={i}
                name={row[0]}
                enumValues={row[1].enumValues}
                required={false}
                updateState={handleState}
              />
            );
          }
        }
      } else {
        return <SubForm updateState={handleState} key={i} data={row} />;
      }
    });
  }

  const handleSubmit = () => {
    let formData = {
      type: selected,
      form: formState,
    };

    axios
      .post(`https://clarityapi.intelligo.ai/api/v1/schemas/submit`, {
        formState,
      })
      .then((res) => {
        console.log(res);
        console.log(res.data);
      });
  };

  // return <DataPickerElement />;
  return (
    <div>
      <div>{rows}</div>
      <Button variant="success" onclick={handleSubmit}>
        Send Form
      </Button>
    </div>
  );
};

export default Form;
