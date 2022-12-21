const Gerencianet = require('gn-api-sdk-node')
const options = require('../../credentials')

let body = {
	payment: {
		credit_card: {
			installments: 1,
			payment_token: '83d52dbd590d9ebc991938c711ddd31f65df89a5',
			billing_address: {
				street: 'Street 3',
				number: 10,
				neighborhood: 'Bauxita',
				zipcode: '35400000',
				city: 'Ouro Preto',
				state: 'MG',
			},
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

gerencianet.createOneStepCharge([], body)
	.then((resposta) => {
		console.log(resposta)
	})
	.catch((error) => {
		console.log(error)
	})
