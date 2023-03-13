import React, { Component } from "react";
import "./Calculator.css";

import Button from "../components/Button";
import Display from "../components/Display";

const initialState = {
  displayValue: "0",
  clearDisplay: false,
  operation: null,
  values: [0, 0],
  current: 0,
};

export default class Calculator extends Component {
  constructor(props) {
    super(props);
    this.ClearMemory = this.ClearMemory.bind(this);
    this.SetOperation = this.SetOperation.bind(this);
    this.AddDigit = this.AddDigit.bind(this);
  }

  state = { ...initialState };

  ClearMemory() {
    this.setState({ ...initialState });
  }

  SetOperation(operation) {
    if (this.state.current === 0) {
      this.setState({ operation, current: 1, clearDisplay: true });
    } else {
      const equals = operation === "=";
      const currentOperation = this.state.operation;

      const values = [...this.state.values];

      try {
        values[0] = eval(`${values[0]} ${currentOperation} ${values[1]}`);
      } catch (error) {
        values[0] = this.state.values[0];
      }

      values[1] = 0;

      this.setState({
        displayValue: values[0],
        operation: equals ? null : operation,
        current: equals ? 0 : 1,
        clearDisplay: !equals,
        values,
      });
    }
  }

  AddDigit(n) {
    if (n === "." && this.state.displayValue.includes(".")) return;

    const clearDisplay =
      this.state.displayValue === "0" || this.state.clearDisplay;
    const currentValue = clearDisplay ? "" : this.state.displayValue;
    const displayValue = currentValue + n;

    this.setState({ displayValue, clearDisplay: false });

    if (n !== ".") {
      const i = this.state.current;
      const newValue = parseFloat(displayValue);
      const values = [...this.state.values];
      values[i] = newValue;
      this.setState({ values });
    }
  }

  render() {
    return (
      <div className="container">
        <div className="calculator">
          <Display value={this.state.displayValue} />
          <Button label="AC" cols="3" click={this.ClearMemory} />
          <Button label="/" operation={true} click={this.SetOperation} />
          <Button label="7" click={this.AddDigit} />
          <Button label="8" click={this.AddDigit} />
          <Button label="9" click={this.AddDigit} />
          <Button label="*" operation={true} click={this.SetOperation} />
          <Button label="4" click={this.AddDigit} />
          <Button label="5" click={this.AddDigit} />
          <Button label="6" click={this.AddDigit} />
          <Button label="-" operation={true} click={this.SetOperation} />
          <Button label="1" click={this.AddDigit} />
          <Button label="2" click={this.AddDigit} />
          <Button label="3" click={this.AddDigit} />
          <Button label="+" operation={true} click={this.SetOperation} />
          <Button label="0" cols="2" click={this.AddDigit} />
          <Button label="." operation={true} click={this.AddDigit} />
          <Button label="=" operation={true} click={this.SetOperation} />
        </div>
      </div>
    );
  }
}
