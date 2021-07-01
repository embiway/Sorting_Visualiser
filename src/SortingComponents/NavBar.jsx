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
                    <Button
                      style={{ margin: "0 10px" }}
                      variant="dark"
                      onClick={() => {
                        this.props.resetArray(-1);
                      }}
                    >
                      Generate Array
                    </Button>
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
                          this.props.mergeSort();
                        }}
                      >
                        Merge Sort
                      </NavDropdown.Item>
                      <NavDropdown.Item
                        href="#bubble_sort"
                        onSelect={() => {
                          this.props.bubbleSort();
                        }}
                      >
                        Bubble Sort
                      </NavDropdown.Item>
                      <NavDropdown.Item
                        href="#insertion_sort"
                        onSelect={() => {
                          this.props.insertionSort();
                        }}
                      >
                        Insertion Sort
                      </NavDropdown.Item>
                      <NavDropdown.Item 
                        href="#selection_sort" 
                        onSelect={() => {
                          this.props.selectionSort();
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