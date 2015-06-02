'use strict';

module.exports = {
  URL: {
    production: 'https://api.gerencianet.com.br',
    sandbox: 'https://sandbox.gerencianet.com.br'
  },
  ENDPOINTS: {
    authorize: '/authorize',
    charge: '/charge',
    detailCharge: '/charge/detail',
    customer: '/customer',
    pay: '/payment/pay',
    paymentData: '/payment/data',
    notification: '/notification',
    updateNotification: '/notification/update',
    detailSubscription: '/subscription/detail',
    cancelSubscription: '/subscription/cancel',
    plan: '/plan',
    deletePlan: '/plan/delete'
  }
};