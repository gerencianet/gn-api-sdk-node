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
    payCharge: '/charge/pay',
    createCarnet: '/carnet',
    detailCarnet: '/carnet/detail',
    updateParcel: '/carnet/parcel/update',
    updateCarnetMetadata: '/carnet/metadata/update',
    getNotification: '/notification/detail',
    createPlan: '/plan',
    deletePlan: '/plan/delete',
    createSubscription: '/subscription',
    detailSubscription: '/subscription/detail',
    paySubscription: '/subscription/pay',
    cancelSubscription: '/subscription/cancel',
    updateSubscriptionMetadata: '/subscription/metadata/update',
    getPaymentData: '/payment/data',
  }
};