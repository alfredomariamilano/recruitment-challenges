const { makeError, ERRORS } = require('./utils/errorHandling')
const { normalizeEmail, normalizeStreet, normalizeState } = require('./utils/normalizers')

class Order {
  constructor (items) {
    // Check if the items comprising the line are all present
    if (items.length !== 8) {
      throw makeError(ERRORS.ORDER_ITEMS_LENGTH, items)
    }

    this.orderId = Number(items[0])
    this.dealId = Number(items[1])
    this.email = normalizeEmail(items[2].toLowerCase())
    this.street = normalizeStreet(items[3].toLowerCase())
    this.city = items[4].toLowerCase()
    this.state = normalizeState(items[5].toLowerCase())
    this.zipCode = items[6]
    this.creditCard = items[7]
  }

  static isDifferentCreditCard (order, orderToCompare) {
    return order.creditCard !== orderToCompare.creditCard
  }

  static isSameDealId (order, orderToCompare) {
    return order.dealId === orderToCompare.dealId
  }

  static isSameEmail (order, orderToCompare) {
    return order.email === orderToCompare.email
  }

  static isSameAddress (order, orderToCompare) {
    return order.state === orderToCompare.state &&
      order.zipCode === orderToCompare.zipCode &&
      order.street === orderToCompare.street &&
      order.city === orderToCompare.city
  }

  static isFraudulent (order, orderToCompare) {
    return (this.isSameDealId(order, orderToCompare) && this.isDifferentCreditCard(order, orderToCompare)) && (this.isSameEmail(order, orderToCompare) || this.isSameAddress(order, orderToCompare))
  }
}

module.exports = Order
