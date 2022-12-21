const Gerencianet = require('gn-api-sdk-node')
const options = require('../../credentials')

let params = {
	inicio: '2022-01-22T16:01:35Z',
	fim: '2022-11-30T20:10:00Z',
}

const gerencianet = new Gerencianet(options)

gerencianet.pixListCharges(params)
	.then((resposta) => {
		console.log(resposta)
	})
	.catch((error) => {
		console.log(error)
	})
