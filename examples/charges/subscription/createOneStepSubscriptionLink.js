const Gerencianet = require('gn-api-sdk-node')
const options = require('../../credentials')

let params = {
	id: 0,
}

let body = {
	items: [
		{
			name: 'Product One',
			value: 600,
			amount: 1,
		},
	],
	settings: {
		payment_method: 'all',
		expire_at: '2022-12-15',
		request_delivery_address: false,
	},
}

const gerencianet = new Gerencianet(options)

gerencianet.oneStepSubscriptionLink(params, body).then((resposta) => {
	console.log(resposta)
}).catch((error) => {
	console.log(error)
})
