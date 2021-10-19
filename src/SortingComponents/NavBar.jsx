import React, { Component } from 'react';
import { Navbar, Nav, NavDropdown, Button } from "react-bootstrap";

class NavBar extends Component {
    render() { 
        return (
            <div>
              <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Navbar.Brand href="#home">Sorting-Visualiser</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                  <Nav className="mr-auto">
                    {this.props.isGenerateArrayEnabled ? <Button
                      style={{ margin: "0 10px" }}
                      variant="dark"
                      onClick={() => {
                        this.props.resetArray(-1);
                      }}
                    >
                      Generate Array
                    </Button> : <Button
                      style={{ margin: "0 10px" }}
                      variant="dark"
                      disabled
                      onClick={() => {
                        this.props.resetArray(-1);
                      }}
                    >
                      Generate Array
                    </Button>}
                    <Button
                      variant="dark"
                      onClick={() => {
                        this.props.changeBarColor();
                      }}
                    >
                      Color Change
                    </Button>
                    <NavDropdown title="Algorithms" id="collasible-nav-dropdown">
                      <NavDropdown.Item
                        href="#merge_sort"
                        onSelect={() => {
                          this.props.deactivateSlider();
                          this.props.selectAlgo("MergeSort");
                        }}
                      >
                        Merge Sort
                      </NavDropdown.Item>
                      <NavDropdown.Item
                        href="#bubble_sort"
                        onSelect={() => {
                          this.props.deactivateSlider();
                          this.props.selectAlgo("BubbleSort");
                        }}
                      >
                        Bubble Sort
                      </NavDropdown.Item>
                      <NavDropdown.Item
                        href="#insertion_sort"
                        onSelect={() => {
                          this.props.deactivateSlider();
                          this.props.selectAlgo("InsertionSort");
                        }}
                      >
                        Insertion Sort
                      </NavDropdown.Item>
                      <NavDropdown.Item 
                        href="#selection_sort" 
                        onSelect={() => {
                          this.props.deactivateSlider();
                          this.props.selectAlgo("SelectionSort");
                        }}>
                        Selection Sort
                      </NavDropdown.Item>
                    </NavDropdown>
                  </Nav>
                  <Nav>
                    <Nav.Link href="#instructions" onSelect={() => {
                      this.props.showModal()
                    }}>Instructions</Nav.Link>
                    <Nav.Link eventKey={2} href="#remarks">
                      Remarks
                    </Nav.Link>
                  </Nav>
                </Navbar.Collapse>
              </Navbar>
            </div>
        );
    }
}
 
export default NavBar;