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
}

const gerencianet = new Gerencianet(options)

gerencianet.oneStepSubscription(params, body).then((resposta) => {
	console.log(resposta)
}).catch((error) => {
	console.log(error)
})
