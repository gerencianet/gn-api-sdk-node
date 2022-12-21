const Gerencianet = require('gn-api-sdk-node')
const options = require('../../credentials')

const gerencianet = new Gerencianet(options)

let body = {
	pagador: {
		idParticipante: '',
		cpf: '',
	},
	valor: '0.01',
	favorecido: {
		contaBanco: {
			codigoBanco: '',
			agencia: '',
			documento: '',
			nome: '',
			conta: '',
			tipoConta: '',
		},
	},
	codigoCidadeIBGE: '',
	infoPagador: 'Cobrança referente ao pedido X',
}

gerencianet.ofStartPixPayment([], body)
	.then((resposta) => {
		console.log(resposta)
	})
	.catch((error) => {
		console.log(error)
	})
