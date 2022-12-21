const Gerencianet = require('gn-api-sdk-node')
const options = require('../../credentials')

let params = {
	id: 1002,
	parcel: 1,
}

let body = {
	email: 'oldbuck@gerencianet.com.br',
}

const gerencianet = new Gerencianet(options)

gerencianet.resendParcel(params, body)
	.then((resposta) => {
		console.log(resposta)
	})
	.catch((error) => {
		console.log(error)
	})
