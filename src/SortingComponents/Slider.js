import React, { useState } from 'react';
import 'react-bootstrap-range-slider/dist/react-bootstrap-range-slider.css';
import RangeSlider from 'react-bootstrap-range-slider';

let NUMBER = 0;

function fun(){
    return NUMBER;
}
function Slider(){

  const [ value, setValue ] = useState(0); 
  NUMBER = value;
  return (
    <RangeSlider
      value={value}
      onChange={changeEvent => setValue(changeEvent.target.value)}
    />
  );

};

export default {Slider , fun};