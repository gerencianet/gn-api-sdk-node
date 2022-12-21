const Gerencianet = require('gn-api-sdk-node')
const options = require('../../credentials')

let params = {
	id: 0,
	parcel: 1,
}

const gerencianet = new Gerencianet(options)

gerencianet.cancelCarnetParcel(params)
	.then((resposta) => {
		console.log(resposta)
	})
	.catch((error) => {
		console.log(error)
	})
