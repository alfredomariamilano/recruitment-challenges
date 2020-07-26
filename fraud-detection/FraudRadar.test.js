const { FraudRadar } = require('./FraudRadar')
const path = require('path')
const assert = require('assert')

const fraudRadar = new FraudRadar(
  path.join(__dirname, 'Files')
)

describe('Fraud Radar', function () {
  it('Should process the one line file', function () {
    const result = fraudRadar.check('OneLineFile.txt')
    assert.ok(result)
    assert.equal(result.length, 0)
  })

  it('Should process the two line file in which the second is fraudulent', function () {
    const result = fraudRadar.check('TwoLines_FraudulentSecond.txt')
    assert.ok(result)
    assert.equal(result.length, 1)
    assert.equal(result[0].isFraudulent, true)
    assert.equal(result[0].orderId, 2)
  })

  it('Should process the three line file in which the second is fraudulent', function () {
    const result = fraudRadar.check('ThreeLines_FraudulentSecond.txt')
    assert.ok(result)
    assert.equal(result.length, 1)
    assert.equal(result[0].isFraudulent, true)
    assert.equal(result[0].orderId, 2)
  })

  it('Should process the four line file in which more than one order is fraudulent', function () {
    const result = fraudRadar.check('FourLines_MoreThanOneFraudulent.txt')
    assert.ok(result)
    assert.equal(result.length, 2)
  })
})
