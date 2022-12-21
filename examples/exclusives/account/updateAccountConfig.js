const Gerencianet = require('gn-api-sdk-node')
const options = require('../../credentials')

let body = {
	pix: {
		receberSemChave: true,
		chaves: {
			SUACHAVEPIX: {
				recebimento: {
					txidObrigatorio: false,
					qrCodeEstatico: {
						recusarTodos: false,
					},
				},
			},
		},
	},
}

const gerencianet = new Gerencianet(options)

gerencianet.updateAccountConfig([], body)
	.then((resposta) => {
		console.log(resposta)
	})
	.catch((error) => {
		console.log(error)
	})
