const Gerencianet = require('gn-api-sdk-node')
const options = require('../../credentials')

let params = {
	idEnvio: '01',
}

let body = {
	valor: '12.34',
	pagador: {
		chave: 'SUACHAVEPIX',
	},
	favorecido: {
		chave: 'ChavePixDeDestino',
	},
}

const gerencianet = new Gerencianet(options)

gerencianet.pixSend(params, body)
	.then((resposta) => {
		console.log(resposta)
	})
	.catch((error) => {
		console.log(error)
	})
