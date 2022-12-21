const Gerencianet = require('gn-api-sdk-node')
const options = require('../../credentials')

//Informe no body somente os dados que deseja atualizar
let body = {
	loc: {
		id: 789,
	},
	devedor: {
		logradouro: 'Alameda Souza, Numero 80, Bairro Braz',
		cidade: 'Recife',
		uf: 'PE',
		cep: '70011750',
		cpf: '12345678909',
		nome: 'Francisco da Silva',
	},
	valor: {
		original: '123.45',
	},
	solicitacaoPagador: 'Cobrança dos serviços prestados.',
}

let params = {
	txid: 'dt9BHlyzrb5jrFNAdfEDVpHgiOmDbVqVxd', // Informe o TxId da cobrança
}

const gerencianet = new Gerencianet(options)

gerencianet.pixUpdateDueCharge(params, body)
	.then((resposta) => {
		console.log(resposta)
	})
	.catch((error) => {
		console.log(error)
	})
