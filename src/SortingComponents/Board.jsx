import React, { Component } from "react";
import BubbleSort from "../Algorithms/BubbleSort.js";
import InsertionSort from "../Algorithms/InsertionSort.js";
import MergeSort from "../Algorithms/MergeSort.js";
import NavBar from "./NavBar.jsx";
import Slider from "./Slider.jsx"
import "./Board.css"
import SelectionSort from "../Algorithms/SelectionSort.js";
import InstructionsModal from './InstructionsModal'

const ANIMATION_SPEED = 2;
const DEFAULT_BAR_COLOR = "pink";
const ALTER_BAR_COLOR = "blue";
const CORRECT_PLACE_COMPARISION_BAR_COLOR = "green";
const INCORRECT_PLACE_COMPARISION_BAR_COLOR = "red";
let WIDTH = 980;
let MAX_HEIGHT = 500;
let BAR_WIDTH = 7;

class Bars extends Component {
  constructor() {
    super();
    this.state = {
      array: [],
      barColor: DEFAULT_BAR_COLOR,
      size: 0,
      modalActive: false
    };

    this.changeBarColor = this.changeBarColor.bind(this)
    this.resetArray = this.resetArray.bind(this)
    this.mergeSort = this.mergeSort.bind(this)
    this.insertionSort = this.insertionSort.bind(this)
    this.bubbleSort = this.bubbleSort.bind(this)
    this.selectionSort = this.selectionSort.bind(this)
    this.showModal = this.showModal.bind(this)
  }


  componentDidMount() {
    this.resetArray(0);
  }

  // method to set showModal to true so that it can be shown when We click on Instructions on the NavBar.
  showModal() {
    this.setState({modalActive: true})
  }

  // used to toggle between the bar color pink and blue.
  changeBarColor() {
    console.log("Function")
    if (this.state.barColor === DEFAULT_BAR_COLOR) {
      this.setState({barColor : ALTER_BAR_COLOR})
      const arrayBars = document.getElementsByClassName(
        "array-bar"
      );
      for (let i = 0; i < arrayBars.length; i++)
        arrayBars[i].style.backgroundColor = ALTER_BAR_COLOR;
    }
    else {
      this.setState({barColor : DEFAULT_BAR_COLOR})
      const arrayBars = document.getElementsByClassName(
        "array-bar"
      );
      for (let i = 0; i < arrayBars.length; i++)
        arrayBars[i].style.backgroundColor = DEFAULT_BAR_COLOR;
    }
  }

  // Called everytime the generate array is called or when we use the slider.
  resetArray(array_size) {
    if (array_size !== -1)
      this.setState({size : array_size})
    BAR_WIDTH = WIDTH / this.state.size - 1;
    const bars = [];
    let max_height = 0;
    for (let i = 0; i < this.state.size; i++) {
      let number = generateRandomValue(5, 500);
      if (max_height < number){
        max_height = number;
      }
      bars.push(number);
    }
    MAX_HEIGHT = max_height;

    // for (let i = 0; i < 500; i++) console.log(bars[i]);
    this.setState({ array: bars });
  }

  bubbleSort() {
    const { array } = this.state
    const newArray = BubbleSort.bubbleSort(array);

    const animations = [];

    for (const animation of newArray) {
      animations.push(animation.comparision);
      animations.push(animation.swap);
      animations.push(animation.comparision);
    }

    for (let i = 0; i < animations.length; i++) {
      const arrayBars = document.getElementsByClassName("array-bar");
      const [indexBar1, indexBar2] = animations[i];
      if (i % 3 === 1) {
        setTimeout(() => {
          let height_bar1 = arrayBars[indexBar1].style.height;
          let height_bar2 = arrayBars[indexBar2].style.height;

          arrayBars[indexBar1].style.height = height_bar2;
          arrayBars[indexBar2].style.height = height_bar1;
        }, i * ANIMATION_SPEED);
      } else {
        setTimeout(() => {
          let height_bar1 = arrayBars[indexBar1].style.height;
          let height_bar2 = arrayBars[indexBar2].style.height;

          if (height_bar1 - height_bar2 > 0) {
            arrayBars[
              indexBar1
            ].style.backgroundColor = INCORRECT_PLACE_COMPARISION_BAR_COLOR;
            arrayBars[
              indexBar2
            ].style.backgroundColor = INCORRECT_PLACE_COMPARISION_BAR_COLOR;
            if (i % 3 === 2) {
              arrayBars[indexBar1].style.backgroundColor = DEFAULT_BAR_COLOR;
              arrayBars[indexBar2].style.backgroundColor = DEFAULT_BAR_COLOR;
            }
          } else {
            arrayBars[
              indexBar1
            ].style.backgroundColor = CORRECT_PLACE_COMPARISION_BAR_COLOR;
            arrayBars[
              indexBar2
            ].style.backgroundColor = CORRECT_PLACE_COMPARISION_BAR_COLOR;
            if (i % 3 === 2) {
              arrayBars[indexBar1].style.backgroundColor = DEFAULT_BAR_COLOR;
              arrayBars[indexBar2].style.backgroundColor = DEFAULT_BAR_COLOR;
            }
          }
        }, i * ANIMATION_SPEED);
      }
    }
  }

  insertionSort() {
    const { array } = this.state
    const animations = InsertionSort.insertionSort(array);

    for (let i = 0; i < animations.length; i++) {
      const arrayBar = document.getElementsByClassName("array-bar");
      const [index_1, index_2, operation] = animations[i];

      setTimeout(() => {
        if (operation === 1) {
          let bar1_prop = arrayBar[index_1].style;
          let bar2_prop = arrayBar[index_2].style;

          if (bar1_prop.height < bar2_prop.height) {
            bar1_prop.backgroundColor = INCORRECT_PLACE_COMPARISION_BAR_COLOR;
            bar2_prop.backgroundColor = INCORRECT_PLACE_COMPARISION_BAR_COLOR;
          } else {
            bar1_prop.backgroundColor = CORRECT_PLACE_COMPARISION_BAR_COLOR;
            bar2_prop.backgroundColor = CORRECT_PLACE_COMPARISION_BAR_COLOR;
          }
        } else if (operation === 2) {
          let bar1_prop = arrayBar[index_1].style;
          let bar2_prop = arrayBar[index_2].style;
          bar1_prop.backgroundColor = DEFAULT_BAR_COLOR;
          bar2_prop.backgroundColor = DEFAULT_BAR_COLOR;
        } else {
          let bar1_prop = arrayBar[index_1].style;
          bar1_prop.height = `${index_2}px`;
        }
      }, i * ANIMATION_SPEED);
    }
  }

  selectionSort() {
    const { array } = this.state
    const animations = SelectionSort.selectionSort(array);
    console.log("hello")
    for (let i = 0; i < animations.length; i++) {
      const arrayBar = document.getElementsByClassName("array-bar");
      const [index_1, index_2, operation] = animations[i];

      setTimeout(() => {
        if (operation === 1) {
          let bar1_prop = arrayBar[index_1].style;
          let bar2_prop = arrayBar[index_2].style;

          if (bar1_prop.height < bar2_prop.height) {
            bar1_prop.backgroundColor = INCORRECT_PLACE_COMPARISION_BAR_COLOR;
            bar2_prop.backgroundColor = INCORRECT_PLACE_COMPARISION_BAR_COLOR;
          } else {
            bar1_prop.backgroundColor = CORRECT_PLACE_COMPARISION_BAR_COLOR;
            bar2_prop.backgroundColor = CORRECT_PLACE_COMPARISION_BAR_COLOR;
          }
        } else if (operation === 2) {
          let bar1_prop = arrayBar[index_1].style;
          let bar2_prop = arrayBar[index_2].style;
          bar1_prop.backgroundColor = DEFAULT_BAR_COLOR;
          bar2_prop.backgroundColor = DEFAULT_BAR_COLOR;
        } else {
          let bar1_prop = arrayBar[index_1].style;
          bar1_prop.height = `${index_2}px`;
        }
      }, i * ANIMATION_SPEED);
    }
  }

  mergeSort() {
    const { array } = this.state
    const animations = MergeSort.getAnimationsforMergeSort(array);
    const arrayBars = document.getElementsByClassName("array-bar");
    let index = 0;
    let size = arrayBars.length
    for (let [index_1, index_2, operation] of animations) {
      setTimeout(() => {
        if (operation === 1) {
          console.log(index_1);
          arrayBars[
            index_1
          ].style.height = INCORRECT_PLACE_COMPARISION_BAR_COLOR;
        } else {
          if (index_1 >= size) {
            console.log(index_1);
          } else arrayBars[index_1].style.height = `${index_2}px`;
        }
      }, index * 5);
      index++;
    }
  }

  render() {
    return (
      <>
        <Slider resetArray={this.resetArray}/>
        <NavBar resetArray={this.resetArray}
                changeBarColor={this.changeBarColor}
                mergeSort={this.mergeSort}
                bubbleSort={this.bubbleSort}
                insertionSort={this.insertionSort}
                selectionSort={this.selectionSort}
                showModal={this.showModal}/>
        <InstructionsModal
          show={this.state.modalActive}
          onHide={() => this.setState({modalActive: false})}
        />
        <div style={{ backgroundColor: "black", width: "100%" }}>
          <div
            style={{
              marginTop: "70px",
              backgroundColor: "black",
              height: `${MAX_HEIGHT}px`,
              margin: "3% 10%"
            }}
            className="array-container"
          >
            {this.state.array.map((value, idx) => (
              <div
                className="array-bar"
                key={idx}
                style={{ height: `${value}px`, width: `${BAR_WIDTH}px` }}
              ></div>
            ))}
          </div>
        </div>
      </>
    )
  }
}

function generateRandomValue(lower_bound, upper_bound) {
  return Math.floor(
    Math.random() * (upper_bound - lower_bound + 1) + lower_bound
  );
}

export default Bars;

