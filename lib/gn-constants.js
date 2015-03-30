'use strict';

module.exports = {
  URL: {
    production: 'http://localhost:4400',
    sandbox: 'http://localhost:4400'
  },
  ENDPOINTS: {
    authorize: '/authorize',
    charge: '/charge',
    client: '/client',
    pay: '/payment/pay',
    paymentMethods: '/payment/methods'
  }
}