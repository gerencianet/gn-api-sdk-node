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
    updateChargeMetadata: '/charge/metadata/update',
    updateBillet: '/charge/billet/update',
    createCustomer: '/charge/customer/associate',
    createPayment: '/pay',
    getPaymentData: '/payment/data',
    getNotification: '/notification',
    updateNotification: '/notification/update',
    createSubscription: '/subscription',
    detailSubscription: '/subscription/detail',
    cancelSubscription: '/subscription/cancel',
    createPlan: '/plan',
    deletePlan: '/plan/delete',
    createCarnet: '/carnet',
    detailCarnet: '/carnet/detail'
  }
};