function bubbleSort(array) {
  const animations = [];
  const size = array.length;

  for (let i = 0; i < size - 1; i++) {
    for (let j = 0; j < size - i - 1; j++) {
      const animation = {};
      animation.comparision = [j, j + 1];
      if (array[j] > array[j + 1]) {
        let temp = array[j];
        array[j] = array[j + 1];
        array[j + 1] = temp;
        animation.swap = [j, j + 1];
      } else {
        animation.swap = [j, j];
      }

      animations.push(animation);
    }
  }
  return animations;
}

export default { bubbleSort };
