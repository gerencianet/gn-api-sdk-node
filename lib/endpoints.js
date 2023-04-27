const fs = require('fs')
const https = require('https')
const Auth = require('./auth')
const sdkPackage = require('../package.json')
const axios = require('axios')
const randomstring = require('randomstring')

class Endpoints {
	constructor(options, constants) {
		this.options = options
		this.accessToken = null
		this.constants = constants
	}
	run(name, params, body) {
		if (this.constants.APIS.DEFAULT.ENDPOINTS.hasOwnProperty(name)) {
			this.endpoint = this.constants.APIS.DEFAULT.ENDPOINTS[name]
			this.options.baseUrl = this.options.sandbox ? this.constants.APIS.DEFAULT.URL.SANDBOX : this.constants.APIS.DEFAULT.URL.PRODUCTION
		} else {
			Object.keys(this.constants.APIS).forEach((key) => {
				if (this.constants.APIS[key].ENDPOINTS.hasOwnProperty(name)) {
					this.endpoint = this.constants.APIS[key].ENDPOINTS[name]
					this.options.baseUrl = this.options.sandbox ? this.constants.APIS[key].URL.SANDBOX : this.constants.APIS[key].URL.PRODUCTION
					this.options.authRoute = this.constants.APIS[key].ENDPOINTS.authorize
					return
				}
			})

			try {

				if(this.options.pemKey){
					this.agent = new https.Agent({
						cert: fs.readFileSync(this.options.certificate),
						key: fs.readFileSync(this.options.pemKey),
						passphrase: ''
					  })
				}else{
					this.agent = new https.Agent({
						pfx: fs.readFileSync(this.options.certificate),
						passphrase: '',
					})
				}
				
				this.options.agent = this.agent

			} catch (error) {
				throw new Error(`FALHA AO LER O CERTIFICADO`)
			}
		}
		this.body = body
		this.params = params

		return this.req()
	}
	getAccessToken() {
		const auth = new Auth(this.options, this.constants)
		return auth
			.getAccessToken()
			.then((response) => {
				return response.access_token
			})
			.catch((err) => {
				return err
			})
	}

	async req() {
		let req = await this.createRequest(this.endpoint.route)

		return axios(req)
			.then((res) => {
				return res.data
			})
			.catch((error) => {
				throw error.response.data
			})
	}
	async createRequest(route) {
		let regex = /\:(\w+)/g
		let query = ''
		let placeholders = route.match(regex) || []
		let params = {}

		for (let prop in this.params) {
			params[prop] = this.params[prop]
		}

		let getVariables = function () {
			return placeholders.map(function (item) {
				return item.replace(':', '')
			})
		}

		let updateRoute = function () {
			let variables = getVariables()
			variables.forEach(function (value, index) {
				if (params[value]) {
					route = route.replace(placeholders[index], params[value])
					delete params[value]
				}
			})
		}

		let getQueryString = function () {
			let keys = Object.keys(params)
			let initial = keys.length >= 1 ? '?' : ''
			return keys.reduce(function (previous, current, index, array) {
				let next = index === array.length - 1 ? '' : '&'
				return [previous, current, '=', params[current], next].join('')
			}, initial)
		}

		updateRoute()
		query = getQueryString()

		const access_token = await this.getAccessToken()

		let headers = {
			'api-sdk': 'node-' + sdkPackage.version,
			'Content-Type': 'application/json',
			authorization: `Bearer ${access_token}`,
		}

		headers['x-skip-mtls-checking'] = !this.options.validateMtls

		if (this.options.partner_token) {
			headers['partner-token'] = this.options.partner_token
		}

		if (this.options.baseUrl == this.constants.APIS.OPENFINANCE.URL.PRODUCTION || this.options.baseUrl == this.constants.APIS.OPENFINANCE.URL.SANDBOX) {
			headers['x-idempotency-key'] = randomstring.generate({ length: 72, charset: 'alphanumeric' })
		}

		let req = {
			method: this.endpoint.method,
			url: String([this.options.baseUrl, route, query].join('')),
			headers: headers,
			data: this.body,
		}

		if (this.options.baseUrl != this.constants.APIS.DEFAULT.URL.PRODUCTION && this.options.baseUrl != this.constants.APIS.DEFAULT.URL.SANDBOX) {
			req['httpsAgent'] = this.agent
		}

		return req
	}
}

module.exports = Endpoints
