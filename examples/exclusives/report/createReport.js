const Gerencianet = require('gn-api-sdk-node')
const options = require('../../credentials')

let body = {
	dataMovimento: '2023-04-24',
	tipoRegistros: {
		pixRecebido: true,
		pixEnviadoChave: true,
		pixEnviadoDadosBancarios: true,
		estornoPixEnviado: true,
		pixDevolucaoEnviada: true,
		pixDevolucaoRecebida: true,
		tarifaPixEnviado: true,
		tarifaPixRecebido: true,
		estornoTarifaPixEnviado: true,
		saldoDiaAnterior: true,
		saldoDia: true,
		transferenciaEnviada: true,
		transferenciaRecebida: true,
		estornoTransferenciaEnviada: true,
		tarifaTransferenciaEnviada: true,
		estornoTarifaTransferenciaEnviada: true,
	},
}

const gerencianet = new Gerencianet(options)

gerencianet.createReport([], body)
	.then((resposta) => {
		console.log(resposta)
	})
	.catch((error) => {
		console.log(error)
	})
