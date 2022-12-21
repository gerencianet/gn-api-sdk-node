const Gerencianet = require('gn-api-sdk-node')
const options = require('../../credentials')

let params = {
	id: 0,
}

let body = {
	payment: {
		credit_card: {
			payment_token: '33ffd6d982cd63f767fb2ee5c458cd39e8fc0ea0',
			billing_address: {
				street: 'Av. JK',
				number: 909,
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
}

const gerencianet = new Gerencianet(options)

gerencianet.defineSubscriptionPayMethod(params, body)
	.then((resposta) => {
		console.log(resposta)
	})
	.catch((error) => {
		console.log(error)
	})
