const sdkPackage = require('../package.json')
const axios = require('axios')

class Auth {
	constructor(options, constants) {
		this.constants = constants
		this.clientId = options.client_id
		this.clientSecret = options.client_secret
		this.baseUrl = options.baseUrl
		this.agent = options.agent
		this.authRoute = options.authRoute
	}
	async getAccessToken() {
		let postParams
		if (this.constants.APIS.DEFAULT.URL.PRODUCTION == this.baseUrl || this.constants.APIS.DEFAULT.URL.SANDBOX == this.baseUrl) {
			postParams = {
				method: 'POST',
				url: this.baseUrl + this.constants.APIS.DEFAULT.ENDPOINTS.authorize.route,
				headers: {
					'api-sdk': 'node-' + sdkPackage.version,
				},
				data: {
					grant_type: 'client_credentials',
				},
				auth: {
					username: this.clientId,
					password: this.clientSecret,
				},
			}
		} else {
			let data_credentials = this.clientId + ':' + this.clientSecret
			let auth = Buffer.from(data_credentials).toString('base64')

			postParams = {
				method: 'POST',
				url: this.baseUrl + this.authRoute.route,
				headers: {
					Authorization: 'Basic ' + auth,
					'Content-Type': 'application/json',
					'api-sdk': 'node-' + sdkPackage.version,
				},
				httpsAgent: this.agent,
				data: {
					grant_type: 'client_credentials',
				},
			}
		}

		return axios(postParams)
			.then((response) => {
				return response.data
			})
			.catch((error) => {
				throw error.response.data
			})
	}
}

module.exports = Auth
