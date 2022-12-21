const Gerencianet = require('gn-api-sdk-node')
const options = require('../../credentials')

let params = {
	e2eId: 'E18236120202104191813s0326120V4K',
	id: '607dc88bb83bf',
}

const gerencianet = new Gerencianet(options)

gerencianet.pixDetailDevolution(params)
	.then((resposta) => {
		console.log(resposta)
	})
	.catch((error) => {
		console.log(error)
	})
