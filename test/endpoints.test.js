const Auth = require('../lib/auth')
const constants = require('../lib/constants')
const Endpoints = require('../lib/endpoints')
const fs = require('fs')

let options = {
	sandbox: false,
	client_id: 'Client_Id',
	client_secret: 'Client_Secret',
	certificate: 'Certificado_Pix',
	authRoute: { route: '/oauth/token', method: 'post' },
	baseUrl: 'https://api-pix.gerencianet.com.br',
}

jest.spyOn(Endpoints.prototype, 'req').mockImplementationOnce(() => {
	return Promise.resolve(pixChargeCreated)
}).mockReturnValueOnce(new Error('FALHA AO LER O CERTIFICADO')).mockReturnValueOnce('')

jest.spyOn(Auth.prototype, 'getAccessToken').mockImplementation(() => {
	return Promise.resolve({
		access_token: 'RfSfS9AJkLu7jPjOp2IbrI',
		token_type: 'Bearer',
		expires_in: 3600,
		scope: 'cob.read',
	})
})

jest.mock('fs')
fs.readFileSync.mockReturnValueOnce('')



let pixChargeCreated = {
	calendario: {
		criacao: '2020-09-09T20:15:00.358Z',
		expiracao: 3600,
	},
	txid: '7978c0c97ea847e78e8849634473c1f1',
	revisao: 0,
	loc: {
		id: 789,
		location: 'pix.example.com/qr/v2/9d36b84fc70b478fb95c12729b90ca25',
		tipoCob: 'cob',
	},
	location: 'pix.example.com/qr/v2/9d36b84fc70b478fb95c12729b90ca25',
	status: 'ATIVA',
	devedor: {
		cnpj: '12345678000195',
		nome: 'Empresa de Serviços SA',
	},
	valor: {
		original: '567.89',
	},
	chave: 'a1f4102e-a446-4a57-bcce-6fa48899c1d1',
	solicitacaoPagador: 'Informe o número ou identificador do pedido.',
}

describe('Endpoints Tests', () => {
	let pixEndpoint = {
		name: 'pixCreateCharge',
		params: { txid: 'dt9BHlyzrb5jrFNAdfEDVpHgiOmDbVq111' },
		body: {
			calendario: {
				expiracao: 3600,
			},
			valor: {
				original: '0.01',
			},
			chave: 'CHAVEPIX',
		},
	}
	it('TEST 0: Shoud get Access Token', async () => {
		let endpoints = new Endpoints(options, constants)
		let res = await endpoints.getAccessToken()

		expect(res).toBe('RfSfS9AJkLu7jPjOp2IbrI')
	})

	it.each([
		{
			description: 'should create a charge',
			body: pixEndpoint,
			expected: pixChargeCreated,
		},
		{
			description: 'should throw "FALHA AO LER O CERTIFICADO"',
			body: pixEndpoint,
			expected: new Error('FALHA AO LER O CERTIFICADO'),
		},
	])('TEST $# : $description', async ({ body, expected }) => {
		let endpoints = new Endpoints(options, constants)
		let res = await endpoints.run(body.name, body.params, body.body)

		expect(res).toStrictEqual(expected)
	})

	it.each([
		{
			description: 'shoud get the request params [createRequest][PIX]',
			name: 'listAccountConfig',
			route: '/v2/gn/config',
			params: [],
			expected: {
				method: 'get',
				url: 'https://api-pix.gerencianet.com.br/v2/gn/config',
				headers: expect.anything(),
				data: expect.anything(),
				httpsAgent: expect.anything(),
			}
		},
		{
			description: 'shoud get the request params [listPlans][SUBSCRIPTION]',
			name: 'listPlans',
			route: '/plans',
			params: [],
			expected: {
				method: 'get',
				url: 'https://api.gerencianet.com.br/v1/plans',
				headers: expect.anything(),
				data: undefined,
			}
		}
	])('TEST $# : $description', async ({ name, route, params, expected }) => {
		let endpoints = new Endpoints(options, constants)
		await endpoints.run(name, params, [])
		let res = await endpoints.createRequest(route)
		expect(res).toStrictEqual(expected);
	})
})
