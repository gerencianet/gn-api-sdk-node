const Gerencianet = require('gn-api-sdk-node')
const options = require('../../credentials')

const gerencianet = new Gerencianet(options)

let params = {
	idPagamento: 0000,
}

gerencianet.payDetailPayment(params, [])
	.then((resposta) => {
		console.log(resposta)
	})
	.catch((error) => {
		console.log(error)
	})
