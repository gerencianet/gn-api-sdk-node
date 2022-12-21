const Gerencianet = require('gn-api-sdk-node')
const options = require('../../credentials')

const gerencianet = new Gerencianet(options)

let params = {
	inicio: '2022-01-01',
	fim: '2022-06-30',
}

gerencianet.ofListPixPayment(params, [])
	.then((resposta) => {
		console.log(resposta)
	})
	.catch((error) => {
		console.log(error)
	})
