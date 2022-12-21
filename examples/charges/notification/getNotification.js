const Gerencianet = require('gn-api-sdk-node')
const options = require('../../credentials')

let params = {
	token: '252948279264ee47e117cb099ef81',
}

const gerencianet = new Gerencianet(options)

gerencianet.getNotification(params)
	.then((resposta) => {
		console.log(resposta)
	})
	.catch((error) => {
		console.log(error)
	})
