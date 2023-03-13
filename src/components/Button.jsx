import React from "react";
import "./Button.css";

export default function Button(props) {
  let classes = "calculator__btn ";

  if (props.cols) {
    classes += "calculator__btn--col-" + props.cols;
  }

  if (props.operation) {
    classes += "calculator__btn--operation";
  }

  return (
    <button
      onClick={(e) => props.click && props.click(props.label)}
      className={classes}
    >
      {props.label}
    </button>
  );
}
