const Gerencianet = require('gn-api-sdk-node')
const options = require('../../credentials')

let params = {
	txid: 'dt9BHlyzrb5jrFNAdfEDVpHgiOmDbVqVxd',
}

const gerencianet = new Gerencianet(options)

gerencianet.pixDetailCharge(params)
	.then((resposta) => {
		console.log(resposta)
	})
	.catch((error) => {
		console.log(error)
	})
