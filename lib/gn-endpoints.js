'use strict';
var fs = require('fs')
var https = require('https');
var q = require('q');
var GnAuth = require('./gn-auth');
var sdkPackage = require('../package.json');
const axios = require('axios');

function GnEndpoints(options, constants) {
	this.options = options;
	this.accessToken = null;
	this.constants = constants;
}

GnEndpoints.prototype.run = function (name, params, body) {
	this.defer = q.defer();
	if (this.constants.ENDPOINTS.PIX.hasOwnProperty(name)) {
		try {
			this.certificate = fs.readFileSync(this.options.pathCert);
			this.agent = new https.Agent({
				pfx: this.certificate,
				passphrase: "",
			});
		} catch (error) {
			throw 'FALHA AO LER O CERTIFICADO'
		}

		this.endpoint = this.constants.ENDPOINTS.PIX[name];
		this.options.baseUrl = this.options.sandbox ? this.constants.URL.PIX.sandbox : this.constants.URL.PIX.production;
	} else {

		this.endpoint = this.constants.ENDPOINTS.DEFAULT[name];
		this.options.baseUrl = this.options.sandbox ? this.constants.URL.DEFAULT.sandbox : this.constants.URL.DEFAULT.production;
	}
	this.body = body;
	this.params = params;

	this.getAccessToken().then(this.directReq.bind(this));

	return this.defer.promise;
};

GnEndpoints.prototype.getAccessToken = function () {
	let self = this;
	var gnAuth = new GnAuth(this.options, this.constants);
	return gnAuth.getAccessToken()
		.then(function (response) {
			self.accessToken = response.access_token;
			return response.access_token;
		}).catch(function (err) {
			return err;
		});
};

GnEndpoints.prototype.req = async function (callback) {
	let req = this.getParams.call(this, this.endpoint.route);
	req['method'] = this.endpoint.method;
	const response = axios(req)
		.then((res) => {
			callback(res);
		})
		.catch((error) => {
			callback(error);
		});
};

GnEndpoints.prototype.directReq = function () {
	this.req(this.directReqCallback.bind(this));
};

GnEndpoints.prototype.getParams = function (route) {
	var regex = /\:(\w+)/g;
	var query = '';
	var placeholders = route.match(regex) || [];
	var params = {};

	for (var prop in this.params) {
		params[prop] = this.params[prop];
	}

	var getVariables = function () {
		return placeholders.map(function (item) {
			return item.replace(':', '');
		});
	};

	var updateRoute = function () {
		var variables = getVariables();
		variables.forEach(function (value, index) {
			if (params[value]) {
				route = route.replace(placeholders[index], params[value]);
				delete params[value];
			}
		});
	};

	var getQueryString = function () {
		var keys = Object.keys(params);
		var initial = keys.length >= 1 ? '?' : '';
		return keys.reduce(function (previous, current, index, array) {
			var next = (index === array.length - 1) ? '' : '&';
			return [previous, current, '=',
				params[current], next
			].join('');
		}, initial);
	};

	updateRoute();
	query = getQueryString();

	var headers = {
		'api-sdk': 'node-' + sdkPackage.version,
		'Content-Type': 'application/json',
		'authorization': "Bearer " + this.accessToken
	};

	if (this.options.partner_token) {
		headers['partner-token'] = this.options.partnerToken;
	}
	if (this.options.validateMtls) {
		headers['x-skip-mtls-checking'] = false;
	} else {
		headers['x-skip-mtls-checking'] = true;
	}

	var req = {
		url: [this.options.baseUrl, route, query].join(''),
		headers: headers,
		data: this.body
	}

	if (this.constants.URL.PIX.production == this.options.baseUrl || this.constants.URL.PIX.sandbox == this.options.baseUrl) {
		req['httpsAgent'] = this.agent
	}

	return req;
};

GnEndpoints.prototype.directReqCallback = function (raw_response) {

	if(raw_response.data){
		if(raw_response.status < 300){
			if (raw_response.data.data){
				this.defer.resolve(raw_response.data.data);
			} else {
				this.defer.resolve(raw_response.data);
			}
		} else {
			this.defer.reject(raw_response.data);
		}
	} else if (raw_response.response && raw_response.response.data) {
		this.defer.reject(raw_response.response.data);
	}
};

module.exports = GnEndpoints;
