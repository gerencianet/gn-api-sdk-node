const Gerencianet = require('gn-api-sdk-node')
const options = require('../../credentials')

let body = {
	payment: {
		credit_card: {
			installments: 1,
			payment_token: 'InsiraAquiUmPayeementeCode',
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
			value: 500,
			amount: 1,
			marketplace: {
				// Defina 1, para a tarifa ser descontada apenas da conta que emitiu a cobrança
				// Defina 2 para a tarifa ser descontada proporcionalmente ao percentual definido para cada conta que receberá o repasse
				mode: 2,
				repasses: [
					{
						payee_code: 'Insira_aqui_o_indentificador_da_conta_destino',
						percentage: 2500,
					},
					{
						payee_code: 'Insira_aqui_o_indentificador_da_conta_destino',
						percentage: 1500,
					},
				],
			},
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
