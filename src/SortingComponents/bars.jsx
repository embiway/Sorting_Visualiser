import React, { Component } from "react";
import BubbleSort from ".././Algorithms/BubbleSort.js";
import InsertionSort from ".././Algorithms/InsertionSort.js";
import MergeSort from ".././Algorithms/MergeSort.js";
import { Navbar, Nav, NavDropdown, Button } from "react-bootstrap";
import Slider from "./Slider.js"
import "./bars.css";

const ANIMATION_SPEED = 2;
const DEFAULT_BAR_COLOR = "pink";
const CORRECT_PLACE_COMPARISION_BAR_COLOR = "green";
const INCORRECT_PLACE_COMPARISION_BAR_COLOR = "red";
let SIZE = 100;
let WIDTH = 980;
let MAX_HEIGHT = 500;
let BAR_WIDTH = 7;

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
    SIZE = Slider.fun();
    BAR_WIDTH = WIDTH / SIZE - 1;
    const bars = [];
    let max_height = 0;
    for (let i = 0; i < SIZE; i++) {
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
    const { array } = this.state;
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
            if (i % 3 == 2) {
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
            if (i % 3 == 2) {
              arrayBars[indexBar1].style.backgroundColor = DEFAULT_BAR_COLOR;
              arrayBars[indexBar2].style.backgroundColor = DEFAULT_BAR_COLOR;
            }
          }
        }, i * ANIMATION_SPEED);
      }
    }
  }

  insertionSort() {
    const { array } = this.state;
    const animations = InsertionSort.insertionSort(array);

    for (let i = 0; i < animations.length; i++) {
      const arrayBar = document.getElementsByClassName("array-bar");
      const [index_1, index_2, operation] = animations[i];

      setTimeout(() => {
        if (operation == 1) {
          let bar1_prop = arrayBar[index_1].style;
          let bar2_prop = arrayBar[index_2].style;

          if (bar1_prop.height < bar2_prop.height) {
            bar1_prop.backgroundColor = INCORRECT_PLACE_COMPARISION_BAR_COLOR;
            bar2_prop.backgroundColor = INCORRECT_PLACE_COMPARISION_BAR_COLOR;
          } else {
            bar1_prop.backgroundColor = CORRECT_PLACE_COMPARISION_BAR_COLOR;
            bar2_prop.backgroundColor = CORRECT_PLACE_COMPARISION_BAR_COLOR;
          }
        } else if (operation == 2) {
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
    const { array } = this.state;
    const animations = MergeSort.getAnimationsforMergeSort(array);
    const arrayBars = document.getElementsByClassName("array-bar");
    let index = 0;
    for (let [index_1, index_2, operation] of animations) {
      setTimeout(() => {
        if (operation == 1) {
          console.log(index_1);
          arrayBars[
            index_1
          ].style.height = INCORRECT_PLACE_COMPARISION_BAR_COLOR;
        } else {
          if (index_1 >= SIZE) {
            console.log(index_1);
          } else arrayBars[index_1].style.height = `${index_2}px`;
        }
      }, index * 5);
      index++;
    }
  }
  render() {
    const { array } = this.state;
    return (
      <div>
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
          <Navbar.Brand href="#home">Sorting-Visualiser</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto">
              <Button
                style={{ margin: "0 10px" }}
                variant="dark"
                onClick={() => {
                  this.resetArray();
                }}
              >
                Generate Array
              </Button>
              <Button
                variant="dark"
                onClick={() => {
                  const arrayBars = document.getElementsByClassName(
                    "array-bar"
                  );
                  for (let i = 0; i < SIZE; i++)
                    arrayBars[i].style.backgroundColor = "blue";
                }}
              >
                Color Change
              </Button>
              <NavDropdown title="Algorithms" id="collasible-nav-dropdown">
                <NavDropdown.Item
                  href="#action/3.1"
                  onSelect={() => {
                    this.mergeSort();
                  }}
                >
                  Merge Sort
                </NavDropdown.Item>
                <NavDropdown.Item
                  href="#action/3.2"
                  onSelect={() => {
                    this.bubbleSort();
                  }}
                >
                  Bubble Sort
                </NavDropdown.Item>
                <NavDropdown.Item
                  href="#action/3.3"
                  onSelect={() => {
                    this.insertionSort();
                  }}
                >
                  Insertion Sort
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">
                  Quick Sort
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
            <Nav>
              <Nav.Link href="#deets">Instructions</Nav.Link>
              <Nav.Link eventKey={2} href="#memes">
                Remarks
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
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
            {array.map((value, idx) => (
              <div
                className="array-bar"
                key={idx}
                style={{ height: `${value}px`, width: `${BAR_WIDTH}px` }}
              ></div>
            ))}
          </div>
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

