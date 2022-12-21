const Gerencianet = require('gn-api-sdk-node')
const options = require('../../credentials')

let body = {
	payment: {
		banking_billet: {
			expire_at: '2024-09-20',
			customer: {
				name: 'Gorbadoc Oldbuck',
				email: 'oldbuck@gerencianet.com.br',
				cpf: '94271564656',
				birth: '1977-01-15',
				phone_number: '5144916523',
			},
		},
	},

	items: [
		{
			name: 'Product 1',
			value: 500,
			amount: 1,
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

gerencianet.createOneStepCharge([], body)
	.then((resposta) => {
		console.log(resposta)
	})
	.catch((error) => {
		console.log(error)
	})
