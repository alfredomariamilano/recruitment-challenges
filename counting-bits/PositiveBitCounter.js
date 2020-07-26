const integerToBinaryString = require('./utils/integerToBinaryString')

function Count (input) {
  // Input must be a number
  if (typeof input !== 'number') {
    throw new TypeError('Input must be a number.')
  }

  // Input must be a positive integer
  if (input < 0) {
    throw new RangeError('Input must be a positive integer.')
  }

  // Convert input to binary string
  return integerToBinaryString(input)
    // Convert string to an array
    .split('')
    // Reverse the items' order
    .reverse()
    .reduce((total, current, i) => {
      // Convert current string '0' | '1' to a number and then boolean for good measure. Could take off the boolean check for an insignificant increase in speed.
      if (Boolean(Number(current))) {
        // Add one positive bit to the count
        total[0]++
        // add the index of the current value to the result array
        total.push(i)
      }

      return total
      // the starting value is an array with the first value being the count of poisitve bits
    }, [0])
}

module.exports = { Count }
