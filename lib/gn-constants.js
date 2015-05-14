'use strict';

module.exports = {
  URL: {
    production: 'http://localhost:4400',
    sandbox: 'http://localhost:4400'
  },
  ENDPOINTS: {
    authorize: '/authorize',
    charge: '/charge',
    detailCharge: '/charge/detail',
    customer: '/customer',
    pay: '/payment/pay',
    paymentMethods: '/payment/methods',
    notification: '/notification',
    updateNotification: '/notification/update',
    detailSubscription: '/subscription/detail',
    cancelSubscription: '/subscription/cancel'
  }
}