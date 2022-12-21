const Gerencianet = require('gn-api-sdk-node')
const options = require('../../credentials')

let params = {
	id: 1004,
}

let body = {
	notification_url: 'http://yourdomain.com',
	custom_id: 'my_new_id',
}

const gerencianet = new Gerencianet(options)

gerencianet.updateCarnetMetadata(params, body)
	.then((resposta) => {
		console.log(resposta)
	})
	.catch((error) => {
		console.log(error)
	})
