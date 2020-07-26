function integerToBinaryString (integer) {
  return (integer >>> 0).toString(2)
}

module.exports = integerToBinaryString
