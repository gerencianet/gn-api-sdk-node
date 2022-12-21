const Gerencianet = require('gn-api-sdk-node')
const options = require('../../credentials')

let body = {
	items: [
		{
			name: 'Product 1',
			value: 1000,
			amount: 2,
		},
	],
	shippings: [
		{
			name: 'Default Shipping Cost',
			value: 100,
		},
	],
}

const gerencianet = new Gerencianet(options)

gerencianet.createCharge({}, body)
	.then((resposta) => {
		console.log(resposta)
	})
	.catch((error) => {
		console.log(error)
	})
