import React from "react";
import { Modal } from "react-bootstrap";
import { Button } from "react-bootstrap";

function InstructionsModal(props) {
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Welcome to the Sorting Visualiser
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ul>
              <li>
            To generate a new array slide the slider to the required size of the array, it will automatically generate 
            a random array of the specified size. You can also use generate array to generate random arrays after fixing
            the array size. <br/>
            </li>
            <li>
            Use Change color to change the color of the bars if you don't like the current colour. <br/>
            </li>

            <li>
            After generating the array, select one of the algorithms from the drop down to visualise it.
            </li>
          </ul>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
}

export default InstructionsModal;