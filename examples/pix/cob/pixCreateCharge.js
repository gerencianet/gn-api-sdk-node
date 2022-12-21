const Gerencianet = require('gn-api-sdk-node')
const options = require('../../credentials')

let body = {
	calendario: {
		expiracao: 3600,
	},
	devedor: {
		cpf: '94271564656',
		nome: 'Gorbadock Oldbuck',
	},
	valor: {
		original: '123.45',
	},
	chave: 'SUACHAVEPIX', // Informe sua chave Pix cadastrada na gerencianet	//o campo abaixo é opcional
	infoAdicionais: [
		{
			nome: 'Pagamento em',
			valor: 'NOME DO SEU ESTABELECIMENTO',
		},
		{
			nome: 'Pedido',
			valor: 'NUMERO DO PEDIDO DO CLIENTE',
		},
	],
}

let params = {
	txid: 'dt9BHlyzrb5jrFNAdfEDVpHgiOmDbVq111',
}

const gerencianet = new Gerencianet(options)

gerencianet.pixCreateCharge(params, body)
	.then((resposta) => {
		console.log(resposta)
	})
	.catch((error) => {
		console.log(error)
	})
