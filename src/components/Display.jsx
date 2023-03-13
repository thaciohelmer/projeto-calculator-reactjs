import React from "react";
import "./Display.css";

export default function Display(props) {
  return <div className="calculator__display">{props.value}</div>;
}
