const Gerencianet = require('gn-api-sdk-node')
const options = require('../../credentials')

let params = {
	inicio: '2023-01-22T16:01:35Z',
	fim: '2023-11-30T20:10:00Z',
}

const gerencianet = new Gerencianet(options)

gerencianet.pixListDueCharges(params)
	.then((resposta) => {
		console.log(resposta)
	})
	.catch((error) => {
		console.log(error)
	})
