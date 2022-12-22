const Gerencianet = require('gn-api-sdk-node')
const options = require('../../credentials')

let params = {
	id: 0,
}

let body = {
	settings: {
		billet_discount: 1,
		message: '',
		expire_at: '2023-12-01',
		request_delivery_address: false,
		payment_method: 'all',
	},
	items: [
		{
			name: 'Product 1',
			value: 500,
			amount: 1,
		},
	],
}

const gerencianet = new Gerencianet(options)

gerencianet.createOneStepLink(params, body)
	.then((resposta) => {
		console.log(resposta)
	})
	.catch((error) => {
		console.log(error)
	})
