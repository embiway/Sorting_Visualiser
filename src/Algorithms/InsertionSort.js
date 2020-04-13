function insertionSort(array) {
  const size = array.length;
  /* animations : it is an array that holds the instructions for animation
      if 1 : comparision operation
      if 2 : reversing the color change
      if 3 : assignment
  */
  const animations = [];
  for (let i = 1; i < size; i++) {
    let j,
      temp = array[i];
    for (j = i - 1; j >= 0 && temp < array[j]; j--) {
      animations.push([i, j, 1]);
      animations.push([i, j, 2]);
      animations.push([j + 1, array[j], 3]);
      array[j + 1] = array[j];
    }
    animations.push([j + 1, temp, 3]);
    array[j + 1] = temp;
  }
  // for (let i = 0; i < animations.length; i++) {
  //   let [k, j, num] = animations[i];
  //   console.log(k + " , " + j);
  // }
  return animations;
}

export default { insertionSort };
