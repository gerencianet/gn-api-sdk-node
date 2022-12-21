const Gerencianet = require('gn-api-sdk-node')
const options = require('../../credentials')

let params = {
	e2eId: 'E18236120202104191813s0326120V4K',
}

const gerencianet = new Gerencianet(options)

gerencianet.pixDetailReceived(params)
	.then((resposta) => {
		console.log(resposta)
	})
	.catch((error) => {
		console.log(error)
	})
