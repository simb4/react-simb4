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

  componentWillMount(){
    document.addEventListener("keypress", this.onKeyPress, false);
   }

  componentWillUnmount() {
    document.removeEventListener("keypress", this.onKeyPress, false);
  }

  onKeyPress = (event) => {
    var charCode = (event.which) ? event.which : event.keyCode
    console.log(event);
    if (event.keyCode === 8 || event.keyCode === 46
      || event.code === "BackSpace") this.onBackSpace(); // backspace
    if (48 <= charCode && charCode <= 57) { // digits
      this.onPress(charCode - 48);
    }
    if (charCode === 61 || event.keyCode === 13) this.onEqual(); // equal
    if (charCode === 43) this.onOperation(PLUS);// plus
    if (charCode === 45) this.onOperation(MINUS);// minus
    if (charCode === 42) this.onOperation(MULT);// mult
    if (charCode === 37) this.onOperation(PERCENT);// percent
  }

  onEqual = (callback) => {
    const { operation, values, showValue } = this.state;
    if (!operation) return;
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
