import React from "react";
import InputElement from "./InputElement";
import SelectElment from "./SelectElment";
import DataPickerElement from "./DataPickerElement";
import SubSubForm from "./SubSubForm";

const SubForm = ({ data, updateState }) => {
git
  let scheme = data[1];

  let result = Object.keys(scheme).map((key) => {
    if (typeof scheme[key] === "string") {
      return [key, JSON.parse(scheme[key])];
    } else {
      return [key, scheme[key]];
    }
  });


  let rows;

  if (data) {
    rows = result.map((row, i) => {
      if (row[1].type) {
        if (row[1].type === "String") {
          if (row[1].require) {
            return (
              <InputElement
                updateState={updateState}
                key={i}
                name={row[0]}
                required={true}
              />
            );
          } else {
            return (
              <InputElement
                updateState={updateState}
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
                updateState={updateState}
                key={i}
                name={row[0]}
                required={true}
              />
            );
          } else {
            return (
              <DataPickerElement
                updateState={updateState}
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
                updateState={updateState}
              />
            );
          } else {
            return (
              <SelectElment
                key={i}
                name={row[0]}
                enumValues={row[1].enumValues}
                required={false}
                updateState={updateState}
              />
            );
          }
        }
      } else {
        return <SubSubForm updateState={updateState} key={i} data={row} />;
      }
    });
  }

  return <div>{rows}</div>;
};

export default SubForm;
