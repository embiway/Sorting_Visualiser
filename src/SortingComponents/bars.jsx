import React, { Component } from "react";
import "./bars.css";

class Bars extends Component {
  constructor() {
    super();
    this.state = {
      array: []
    };
  }

  componentDidMount() {
    this.resetArray();
  }

  resetArray() {
    const size = 300;
    const bars = [];
    for (let i = 0; i < size; i++) {
      bars.push(generateRandomValue(5, 600));
    }

    for (let i = 0; i < 500; i++) console.log(bars[i]);
    this.setState({ array: bars });
  }
  render() {
    const { array } = this.state;
    return (
      <div>
        <button
          onClick={() => {
            this.resetArray();
          }}
        >
          generate random array
        </button>
        <div className="array-container">
          {array.map((value, idx) => (
            <div
              className="array-bar"
              key={idx}
              style={{ height: `${value}px` }}
            >
              {value}
            </div>
          ))}
        </div>
      </div>
    );
  }
}

function generateRandomValue(lower_bound, upper_bound) {
  return Math.floor(
    Math.random() * (upper_bound - lower_bound + 1) + lower_bound
  );
}
export default Bars;
