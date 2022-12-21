const Gerencianet = require('gn-api-sdk-node')
let options = require('../../credentials')

options['validateMtls'] = false

let body = {
	webhookUrl: 'https://exemplo-pix/webhook',
}

let params = {
	chave: 'SUACHAVEPIX',
}

const gerencianet = new Gerencianet(options)

gerencianet.pixConfigWebhook(params, body)
	.then((resposta) => {
		console.log(resposta)
	})
	.catch((error) => {
		console.log(error)
	})
