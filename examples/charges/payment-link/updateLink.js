const Gerencianet = require('gn-api-sdk-node')
const options = require('../../credentials')

let params = {
	id: 0,
}

let body = {
	billet_discount: 0,
	card_discount: 0,
	message: '',
	expire_at: '2024-12-01',
	request_delivery_address: false,
	payment_method: 'all',
}

const gerencianet = new Gerencianet(options)

gerencianet.updateChargeLink(params, body)
	.then((resposta) => {
		console.log(resposta)
	})
	.catch((error) => {
		console.log(error)
	})
