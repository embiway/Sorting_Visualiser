import React, { Component } from "react";
import { Button } from "react-bootstrap"
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
const DEFAULT_BAR_CLASS = "array-bar-pink"
const ALTER_BAR_CLASS = "array-bar-blue"
const CORRECT_PLACE_COMPARISION_BAR_COLOR = "green";
const INCORRECT_PLACE_COMPARISION_BAR_COLOR = "red";
let WIDTH = 980;
let MAX_HEIGHT = 700;
let BAR_WIDTH = 7;

class Bars extends Component {
  constructor() {
    super();
    this.state = {
      array: [],
      barColor: DEFAULT_BAR_COLOR,
      size: 0,
      modalActive: false,
      algoSelected: null,
      barClass: "array-bar-pink"
    };

    this.changeBarColor = this.changeBarColor.bind(this)
    this.resetArray = this.resetArray.bind(this)
    this.mergeSort = this.mergeSort.bind(this)
    this.insertionSort = this.insertionSort.bind(this)
    this.bubbleSort = this.bubbleSort.bind(this)
    this.selectionSort = this.selectionSort.bind(this)
    this.showModal = this.showModal.bind(this)
    this.selectAlgo = this.selectAlgo.bind(this)
  }


  componentDidMount() {
    this.resetArray(0);
  }

  // method to set showModal to true so that it can be shown when We click on Instructions on the NavBar.
  showModal() {
    this.setState({modalActive: true});
  }

  selectAlgo(algorithm) {
    this.setState({algoSelected : algorithm});
  }

  // used to toggle between the bar color pink and blue.
  changeBarColor() {
    if (this.state.barColor === DEFAULT_BAR_COLOR) {
      const arrayBars = document.getElementsByClassName(
        `${this.state.barClass}`
      );
      for (let i = 0; i < arrayBars.length; i++)
        arrayBars[i].style.backgroundColor = ALTER_BAR_COLOR;
      this.setState({barColor : ALTER_BAR_COLOR , barClass : ALTER_BAR_CLASS})
    }
    else {
      const arrayBars = document.getElementsByClassName(
        `${this.state.barClass}`
      );
      for (let i = 0; i < arrayBars.length; i++)
        arrayBars[i].style.backgroundColor = DEFAULT_BAR_COLOR;
      this.setState({barColor : DEFAULT_BAR_COLOR , barClass : DEFAULT_BAR_CLASS})
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
      const arrayBars = document.getElementsByClassName(`${this.state.barClass}`);
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
      const arrayBar = document.getElementsByClassName(`${this.state.barClass}`);
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
          bar1_prop.backgroundColor = `${this.state.barColor}`;
          bar2_prop.backgroundColor = `${this.state.barColor}`;
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
      const arrayBar = document.getElementsByClassName(`${this.state.barClass}`);
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
          bar1_prop.backgroundColor = `${this.state.barColor}`;
          bar2_prop.backgroundColor = `${this.state.barColor}`;
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
    const arrayBars = document.getElementsByClassName(`${this.state.barClass}`);
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
                selectAlgo={this.selectAlgo}
                showModal={this.showModal}/>
        <InstructionsModal
          show={this.state.modalActive}
          onHide={() => this.setState({modalActive: false})}
        />
        <div style={{ backgroundColor: "black", width: "100%" , position: "relative" }}>
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
                className={this.state.barClass}
                key={idx}
                style={{ height: `${value}px`, width: `${BAR_WIDTH}px`}}
              ></div>
            ))}
          </div>
          <Button variant="outline-warning" className="button-centre" onClick={ () => {
            const currentAlgo = this.state.algoSelected;
            if (currentAlgo == null) {
              alert("Please select an algorithm to visualize");
              return;
            }

            switch(currentAlgo) {
              case "InsertionSort": this.insertionSort();
                        break;
              case "MergeSort" : this.mergeSort();
                        break;
              case "SelectionSort" : this.selectionSort();
                        break;
              case "BubbleSort" : this.bubbleSort();
                        break;
              default : alert("Algo not found");
            }
          } }>Visualize</Button>{' '} 
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

