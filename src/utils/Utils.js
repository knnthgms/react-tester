function findMean(arr, arrSize) {
  if (arrSize === 1) return arr[arrSize - 1];
  else
    return (
      (findMean(arr, arrSize - 1) * (arrSize - 1) + arr[arrSize - 1]) / arrSize
    );
}

function arrayAverage(arr) {
  //Find the sum
  var sum = 0;
  for (var i in arr) {
    sum += arr[i];
  }
  //Get the length of the array
  var numbersCnt = arr.length;
  //Return the average / mean.
  return sum / numbersCnt;
}

const Utils = { findMean, arrayAverage };
export default Utils;
