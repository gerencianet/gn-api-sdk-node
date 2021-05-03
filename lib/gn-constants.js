'use strict';

module.exports = {
	URL: {
		DEFAULT: {
			production: 'https://api.gerencianet.com.br/v1',
			sandbox: 'https://sandbox.gerencianet.com.br/v1'
		},
		PIX: {
			production: 'https://api-pix.gerencianet.com.br',
			sandbox: 'https://api-pix-h.gerencianet.com.br'
		}
	},
	ENDPOINTS: {
		PIX: {
			authorize:{
				route: '/oauth/token',
				method: 'post'
			},
			pixCreateCharge: {
				route: '/v2/cob/:txid',
				method: 'put'
			},
			pixUpdateCharge: {
				route: '/v2/cob/:txid',
				method: 'patch'
			},
			pixCreateImmediateCharge: {
				route: '/v2/cob',
				method: 'post'
			},
			pixDetailCharge: {
				route: '/v2/cob/:txid',
				method: 'get'
			},
			pixListCharges: {
				route: '/v2/cob',
				method: 'get'
			},
			pixDetail: {
				route: '/v2/pix/:e2eId',
				method: 'get'
			},
			pixListReceived: {
				route: '/v2/pix',
				method: 'get'
			},
			pixSend: {
				route: '/v2/pix',
				method: 'post'
			},
			pixDevolution: {
				route: '/v2/pix/:e2eId/devolucao/:id',
				method: 'put'
			},
			pixDetailDevolution: {
				route: '/v2/pix/:e2eId/devolucao/:id',
				method: 'get'
			},
			pixConfigWebhook: {
				route: '/v2​/webhook/:chave',
				method: 'put'
			},
			pixDetailWebhook: {
				route: '/v2/webhook/:chave',
				method: 'get'
			},
			pixListWebhook: {
				route: '/v2/webhook',
				method: 'get'
			},
			pixDeleteWebhook: {
				route: '/v2/webhook/:chave',
				method: 'delete'
			},
			pixCreateLocation: {
				route: '/v2/loc',
				method: 'post'
			},
			pixListLocation: {
				route: '/v2/loc',
				method: 'get'
			},
			pixDetailLocation: {
				route: '/v2/loc/:id',
				method: 'get'
			},
			pixGenerateQRCode: {
				route: '/v2/loc/:id/qrcode',
				method: 'get'
			},
			pixUnsetTxid: {
				route: '/v2/loc/:id/txid',
				method: 'delete'
			},
			gnCreateEvp: {
				route: '/v2/gn/evp',
				method: 'post'
			},
			gnListEvp: {
				route: '/v2/gn/evp',
				method: 'get'
			},
			gnDeleteEvp: {
				route: '/v2/gn/evp/:chave',
				method: 'delete'
			},
			gnDetailBalance: {
				route: '/v2/gn/saldo',
				method: 'get'
			},
			gnUpdateSettings: {
				route: '/v2/gn/config',
				method: 'put'
			},
			gnDetailSettings: {
				route: '/v2/gn/config',
				method: 'get'
			}
		},

		DEFAULT: {
			authorize: {
				route: '/authorize',
				method: 'post'
			},
			createCharge: {
				route: '/charge',
				method: 'post'
			},
			detailCharge: {
				route: '/charge/:id',
				method: 'get'
			},
			updateChargeMetadata: {
				route: '/charge/:id/metadata',
				method: 'put'
			},
			updateBillet: {
				route: '/charge/:id/billet',
				method: 'put'
			},
			payCharge: {
				route: '/charge/:id/pay',
				method: 'post'
			},
			cancelCharge: {
				route: '/charge/:id/cancel',
				method: 'put'
			},
			createCarnet: {
				route: '/carnet',
				method: 'post'
			},
			detailCarnet: {
				route: '/carnet/:id',
				method: 'get'
			},
			updateParcel: {
				route: '/carnet/:id/parcel/:parcel',
				method: 'put'
			},
			updateCarnetMetadata: {
				route: '/carnet/:id/metadata',
				method: 'put'
			},
			getNotification: {
				route: '/notification/:token',
				method: 'get'
			},
			getPlans: {
				route: '/plans',
				method: 'get'
			},
			createPlan: {
				route: '/plan',
				method: 'post'
			},
			deletePlan: {
				route: '/plan/:id',
				method: 'del'
			},
			createSubscription: {
				route: '/plan/:id/subscription',
				method: 'post'
			},
			detailSubscription: {
				route: '/subscription/:id',
				method: 'get'
			},
			paySubscription: {
				route: '/subscription/:id/pay',
				method: 'post'
			},
			cancelSubscription: {
				route: '/subscription/:id/cancel',
				method: 'put'
			},
			updateSubscriptionMetadata: {
				route: '/subscription/:id/metadata',
				method: 'put'
			},
			getInstallments: {
				route: '/installments',
				method: 'get'
			},
			resendBillet: {
				route: '/charge/:id/billet/resend',
				method: 'post'
			},
			createChargeHistory: {
				route: '/charge/:id/history',
				method: 'post'
			},
			resendCarnet: {
				route: '/carnet/:id/resend',
				method: 'post'
			},
			resendParcel: {
				route: '/carnet/:id/parcel/:parcel/resend',
				method: 'post'
			},
			createCarnetHistory: {
				route: '/carnet/:id/history',
				method: 'post'
			},
			cancelCarnet: {
				route: '/carnet/:id/cancel',
				method: 'put'
			},
			cancelParcel: {
				route: '/carnet/:id/parcel/:parcel/cancel',
				method: 'put'
			},
			linkCharge: {
				route: '/charge/:id/link',
				method: 'post'
			},
			chargeLink: {
				route: '/charge/:id/link',
				method: 'post'
			},
			updateChargeLink: {
				route: '/charge/:id/link',
				method: 'put'
			},
			updatePlan: {
				route: '/plan/:id',
				method: 'put'
			},
			createSubscriptionHistory: {
				route: '/subscription/:id/history',
				method: 'post'
			},
			createChargeBalanceSheet: {
				route: '/charge/:id/balance-sheet',
				method: 'post'
			},
			settleCharge: {
				route: '/charge/:id/settle',
				method: 'put'
			},
			settleCarnetParcel: {
				route: '/carnet/:id/parcel/:parcel/settle',
				method: 'put'
			},
			oneStep: {
				route: '/charge/one-step',
				method: 'post'
			}
		}
	}
};
