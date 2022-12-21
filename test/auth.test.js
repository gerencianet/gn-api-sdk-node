const axios = require('axios')
const fs = require('fs')
const Auth = require('../lib/auth')
const constants = require('../lib/constants')

jest.mock('fs')
fs.readFileSync.mockReturnValueOnce('')

const accessTokenPix = {
	access_token: 'RfSfS9AJkLu7jPjOp2IbrI',
	token_type: 'Bearer',
	expires_in: 3600,
	scope: 'cob.read',
}
const accessTokenBoletos = {
	access_token: '1723ad73',
	refresh_token: '36accb15',
	expires_in: 600,
	expire_at: '1656012603684',
	token_type: 'Bearer',
}

jest.mock('axios', () => jest.fn().mockResolvedValueOnce({ status: 200, data: accessTokenPix }).mockResolvedValueOnce({ status: 200, data: accessTokenBoletos }))

describe('Auth Tests', () => {
	it.each([
		{
			description: 'Should get Access_Token with pix certificate',
			options: {
				sandbox: false,
				client_id: 'Client_Id',
				client_secret: 'Client_Secret',
				certificate: 'Certificado_Pix',
				authRoute: { route: '/oauth/token', method: 'post' },
				baseUrl: 'https://api-pix.gerencianet.com.br',
			},
			expected: { access_token: expect.any(String), token_type: 'Bearer', expires_in: 3600, scope: 'cob.read' },
		},
		{
			description: 'Should get Access_Token without pix certificate [API EMISSÕES]',
			options: {
				sandbox: false,
				client_id: 'Client_Id',
				client_secret: 'Client_Secret',
				authRoute: { route: '/oauth/token', method: 'post' },
				baseUrl: 'https://api.gerencianet.com.br/v1',
			},
			expected: { access_token: '1723ad73', refresh_token: '36accb15', expires_in: 600, expire_at: '1656012603684', token_type: 'Bearer' },
		},
	])('TEST $# : $description', async ({ options, expected }) => {
		const auth = new Auth(options, constants)
		let res = await auth.getAccessToken()
		expect(res).toMatchObject(expected)
		expect(axios).toHaveBeenCalled()
	})
})
