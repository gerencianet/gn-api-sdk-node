const Gerencianet = require('gn-api-sdk-node')
const options = require('../../credentials')

const gerencianet = new Gerencianet(options)

let body = {
	redirectURL: 'https:/suaUrl.com.br/redirect',
	webhookURL: 'https://suaUrl.com.br/webhook',
}

gerencianet.ofConfigUpdate([], body)
	.then((resposta) => {
		console.log(resposta)
	})
	.catch((error) => {
		console.log(error)
	})
