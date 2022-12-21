const Gerencianet = require('gn-api-sdk-node')
const options = require('../../credentials')

const gerencianet = new Gerencianet(options)

let params = {
	codBarras: '',
}

let body = {
	valor: 0,
	dataPagamento: '2022-03-10',
	descricao: 'Pagamento de boleto, teste API Pagamentos',
}

gerencianet.payRequestBarCode(params, body)
	.then((resposta) => {
		console.log(resposta)
	})
	.catch((error) => {
		console.log(error)
	})
