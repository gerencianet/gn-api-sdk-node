const Gerencianet = require('gn-api-sdk-node')
const options = require('../../credentials')

let params = {
	e2eid: '',
}

const gerencianet = new Gerencianet(options)

gerencianet.pixSendDetail(params, [])
	.then((resposta) => {
		console.log(resposta)
	})
	.catch((error) => {
		console.log(error)
	})
