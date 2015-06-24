'use strict';

module.exports = {
  URL: {
    production: 'https://api.gerencianet.com.br',
    sandbox: 'https://sandbox.gerencianet.com.br'
  },
  ENDPOINTS: {
    authorize: '/authorize',
    createCharge: '/charge',
    detailCharge: '/charge/detail',
    createCustomer: '/customer',
    createPayment: '/payment/pay',
    getPaymentData: '/payment/data',
    getNotification: '/notification',
    updateNotification: '/notification/update',
    detailSubscription: '/subscription/detail',
    cancelSubscription: '/subscription/cancel',
    createPlan: '/plan',
    deletePlan: '/plan/delete',
    createCarnet: '/carnet',
    detailCarnet: '/carnet/detail'
  }
};