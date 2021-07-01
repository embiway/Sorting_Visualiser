function selectionSort(array) {
    const size = array.length;
    /* animations : it is an array that holds the instructions for animation
        if 1 : comparision operation
        if 2 : reversing the color change
        if 3 : assignment
    */
    const animations = [];
    for (let i = 0; i < size-1; i++) {
      let j = i,
        index = i , minimum = array[i];
      for (j = i + 1 ; j < size ; j++) {
        animations.push([i, j, 1]);
        animations.push([i, j, 2]);
        if (array[j] < minimum) {
            minimum = array[j]
            index = j
        }
      }
      animations.push([index , array[i], 3]);
      animations.push([i , minimum , 3])
      array[index] = array[i]
      array[i] = minimum
    }

    return animations;
}
  
  export default { selectionSort };

  