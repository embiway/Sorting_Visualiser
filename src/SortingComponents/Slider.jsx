import React, { useState } from 'react';
import 'react-bootstrap-range-slider/dist/react-bootstrap-range-slider.css';
import RangeSlider from 'react-bootstrap-range-slider';

function Slider(props) {
  const [ value, setValue ] = useState(0); 
  return (
    <RangeSlider
      value={value}
      onChange={changeEvent => {
        setValue(changeEvent.target.value)
        props.resetArray(value)
      }}
    />
  );

};

export default Slider;