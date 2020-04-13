function getAnimationsforMergeSort(array) {
  const animations = [];
  mergeSort(array, 0, array.length, animations);
  return animations;
}
function mergeSort(array, startIdx, endIdx, animations) {
  if (startIdx < endIdx) {
    const midIdx = Math.floor((startIdx + endIdx) / 2);
    mergeSort(array, startIdx, midIdx, animations);
    mergeSort(array, midIdx + 1, endIdx, animations);
    merge(array, startIdx, midIdx, endIdx, animations);
  }
}

function merge(array, startIdx, midIdx, endIdx, animations) {
  let i = startIdx,
    j = midIdx + 1,
    index = startIdx;

  const auxiliaryArray = [];
  while (i <= midIdx && j <= endIdx) {
    animations.push([i, j, 1]);
    if (array[i] <= array[j]) {
      animations.push([index, array[i], 2]);
      auxiliaryArray.push(array[i]);
      i++;
    } else {
      animations.push([index, array[j], 2]);
      auxiliaryArray.push(array[j]);
      j++;
    }
    index++;
  }

  while (i <= midIdx) {
    animations.push([index, array[i], 2]);
    auxiliaryArray.push(array[i]);
    i++;
    index++;
  }
  while (j <= endIdx) {
    animations.push([index, array[i], 2]);
    auxiliaryArray.push(array[j]);
    j++;
    index++;
  }

  for (let idx = startIdx, idx2 = 0; idx <= endIdx; idx++, idx2++) {
    array[idx] = auxiliaryArray[idx2];
  }
}

export default { getAnimationsforMergeSort };
