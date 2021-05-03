'use strict';

var sdkPackage = require('../package.json');
var fs = require("fs");
var axios = require("axios");
const https = require('https');

function GnAuth(options, constants) {
	this.constants = constants;
	this.clientId = options.client_id;
	this.clientSecret = options.client_secret;
	this.baseUrl = options.baseUrl;
	try {
		this.certificate = fs.readFileSync(options.pathCert);
	} catch (error) {}
	
}

GnAuth.prototype.getAccessToken = function () {
	
	if (this.constants.URL.PIX.production == this.baseUrl || this.constants.URL.PIX.sandbox == this.baseUrl) {
		var data_credentials = this.clientId + ":" + this.clientSecret;
		var auth = Buffer.from(data_credentials).toString("base64");

		const agent = new https.Agent({
			pfx: this.certificate,
			passphrase: "",
		});
		
		var postParams = {
			method: 'POST',
			url: this.baseUrl + this.constants.ENDPOINTS.PIX.authorize.route,
			headers: {
				'Authorization': "Basic " + auth,
				'Content-Type': "application/json",
				'api-sdk': 'node-' + sdkPackage.version,
			},
			httpsAgent: agent,
			data: {
				grant_type: 'client_credentials'
			}
		};
	} else {
		var postParams = {
			method: 'POST',
			url: this.baseUrl + this.constants.ENDPOINTS.DEFAULT.authorize.route,
			headers: {
				'api-sdk': 'node-' + sdkPackage.version
			},
			data: {
				grant_type: 'client_credentials'
			},
			auth: {
				username: this.clientId,
				password: this.clientSecret
			}
		};

	}


	let response = axios(postParams)
		.then((response) => {
			return response.data;
		})
		.catch((error) => {
			console.error(error);
		});

	return response;
};

module.exports = GnAuth;