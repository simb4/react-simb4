import React, { Component } from 'react';
import './App.css';

const PLUS = '+';
const MINUS = '-';
const MULT = '*';
const PERCENT = '%';
// const EQUAL = '=';
// const BACKSPACE = '⌫';

const OP_FUNCTIONS = {
  [PLUS]: (a, b) => a + b,
  [MULT]: (a, b) => a * b,
  [MINUS]: (a, b) => a - b,
  [PERCENT]: (a) => a / 100,
}


class App extends Component {

  state = {
    operation: null,
    showValue: 0,
    values: [], // it contain 2 values if op is not null. Otherwise there is only one value
  }

  onEqual = (callback) => {
    const { operation, values, showValue } = this.state;
    const newValue = OP_FUNCTIONS[operation](values[0], showValue);
    this.setState({
      values: [newValue], // supposed to be a stack
      showValue: newValue,
      operation: null
    }, callback);
  }

  onOperation = (OP) => {
    const { showValue, values, operation } = this.state;
    
    // this if is optional. This how I understand the default behavour of precent
    if (OP === PERCENT) {
      this.setState({ showValue: OP_FUNCTIONS[PERCENT](showValue) });
      return;
    }
    
    if (!operation) {
      this.setState({
        operation: OP,
        showValue: OP,
        values: [showValue],
      });
    } else {
      this.onEqual((result) => {
        this.setState({ operation: OP, showValue: OP });
      })
    }
  }

  onPress = (digit) => {
    const { showValue } = this.state;
    if (typeof showValue ==='number')
      this.setState({ showValue: showValue * 10 + digit });
    else
      this.setState({ showValue: digit });
  }

  onBackSpace = () => {
    const { showValue } = this.state;
    var newShowValue = '' + showValue;
    newShowValue = newShowValue.slice(0, newShowValue.length - 1);
    this.setState({ showValue: newShowValue });
  }

  render() {
    const { showValue } = this.state;
    return (
      <div className="app">
        <input className="text-area" value={showValue} readOnly />
        <div className="row">
          <button className="square" onClick={() => this.onPress(7)}>7</button>
          <button className="square" onClick={() => this.onPress(8)}>8</button>
          <button className="square" onClick={() => this.onPress(9)}>9</button>
          <button className="square" onClick={() => this.onBackSpace()}>⌫</button>
        </div>
        <div className="row">
          <button className="square" onClick={() => this.onPress(4)}>4</button>
          <button className="square" onClick={() => this.onPress(5)}>5</button>
          <button className="square" onClick={() => this.onPress(6)}>6</button>
          <button className="square" onClick={() => this.onOperation(PLUS)}>+</button>
          
        </div>
        <div className="row">
          <button className="square" onClick={() => this.onPress(1)}>1</button>
          <button className="square" onClick={() => this.onPress(2)}>2</button>
          <button className="square" onClick={() => this.onPress(3)}>3</button>
          <button className="square" onClick={() => this.onOperation(MINUS)}>-</button>
        </div>
        <div className="row">
          <button className="square" onClick={() => this.onPress(0)}>0</button>
          <button className="square" onClick={() => this.onEqual()}>=</button>
          <button className="square" onClick={() => this.onOperation(PERCENT)}>%</button>
          <button className="square" onClick={() => this.onOperation(MULT)}>*</button>
        </div>
      </div>
    );
  }
}

export default App;
