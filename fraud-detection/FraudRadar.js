const Order = require('./Order')
const { makeError, ERRORS } = require('./utils/errorHandling')

const fs = require('fs')
const path = require('path')

class FraudRadar {
  constructor (filesDir) {
    // Check if directory string is present and if the directory does in fact exist
    if (!filesDir || !fs.existsSync(filesDir)) {
      throw makeError(ERRORS.NO_DIR, filesDir)
    }

    this.filesDir = filesDir
  }

  // Read requested file and parse orders from it
  getOrdersFromFile (filePath) {
    try {
      const fileContent = fs.readFileSync(path.resolve(this.filesDir, filePath), 'utf8')
      const lines = fileContent.split('\n')

      return lines.map((line) => {
        const items = line.split(',')

        return new Order(items)
      })
    } catch (error) {
      throw makeError(error.code, path.resolve(this.filesDir, filePath))
    }
  }

  check (filePath) {
    // CHECK FRAUD
    const orders = this.getOrdersFromFile(filePath)

    const fraudulentOrders = orders
      .reduce((_fraudResults, order, i) => {
        const fraudResults = new Map(_fraudResults)

        orders
          .slice(i)
          .forEach((orderToCompare) => {
            const isFraudulent = Order.isFraudulent(order, orderToCompare)

            if (isFraudulent) {
              if (!fraudResults.has(orderToCompare.orderId) && !fraudResults.has(order.orderId)) {
                fraudResults.set(
                  orderToCompare.orderId,
                  {
                    isFraudulent: true,
                    orderId: orderToCompare.orderId
                  }
                )
              }
            }

            return isFraudulent
          })

        return fraudResults
      }, new Map())

    return Array.from(fraudulentOrders.values())
  }
}

module.exports = { FraudRadar }
