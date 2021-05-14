'use strict';
var fs = require('fs')
var https = require('https');
var q = require('q');
var GnAuth = require('./gn-auth');
var sdkPackage = require('../package.json');
const  axios = require('axios');

function GnEndpoints(options, constants) {
	// options.baseUrl = options.sandbox ? constants.URL.DEFAULT.sandbox : constants.URL.DEFAULT.production;
	this.options = options;
	this.accessToken = null;
	this.constants = constants;
}

GnEndpoints.prototype.run = function (name, params, body) {
	var self = this;
	self.defer = q.defer();

	if (self.constants.ENDPOINTS.PIX.hasOwnProperty(name)) {
			try {
				this.certificate = fs.readFileSync(this.options.pathCert);
				this.agent = new https.Agent({
					pfx: this.certificate,
					passphrase: "",
				});
			} catch (error) { 
				throw 'FALHA AO LER O CERTIFICADO'
			}

		self.endpoint = self.constants.ENDPOINTS.PIX[name];
		this.options.baseUrl = this.options.sandbox ? this.constants.URL.PIX.sandbox : this.constants.URL.PIX.production;
	}else{
		
		self.endpoint = self.constants.ENDPOINTS.DEFAULT[name];
		this.options.baseUrl = this.options.sandbox ? this.constants.URL.DEFAULT.sandbox : this.constants.URL.DEFAULT.production;
	}
	self.body = body;
	self.params = params;

	if (!self.accessToken) {
		self.getAccessToken()
			.then(self.directReq.bind(self));
	} else {
		self.withTokenReq.call(self);
	}

	return self.defer.promise;
};

GnEndpoints.prototype.getAccessToken = function () {
	var self = this;
	var gnAuth = new GnAuth(this.options, this.constants);
	return gnAuth.getAccessToken()
		.then(function (response) {
			self.accessToken = response.access_token;
			return self.accessToken;
		}).catch(function (err) {
			return err;
		});
};

GnEndpoints.prototype.getResponse = function (response, body) {
	return this.options
		.raw_response ? response : body;
};

GnEndpoints.prototype.req = async function (callback) {
	let req = this.getParams.call(this, this.endpoint.route);
	req['method'] = this.endpoint.method;
	const response = axios(req)
		.then((res) => {
			callback(res);
			console.log(res.data)
		})
		.catch((error) => {
			callback(error);
			console.log(error.response.data);
		});
};

GnEndpoints.prototype.directReq = function () {
	this.req(this.directReqCallback.bind(this));
};

GnEndpoints.prototype.withTokenReq = function () {
	this.req(this.withTokenReqCallback.bind(this));
};

GnEndpoints.prototype.getParams = function (route) {
	var self = this;
	var regex = /\:(\w+)/g;
	var query = '';
	var placeholders = route.match(regex) || [];
	var params = {};

	for (var prop in self.params) {
		params[prop] = self.params[prop];
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

GnEndpoints.prototype.withTokenReqCallback = function (err, httpResponse, httpResponseBody) {
	var self = this;
	var response = self.getResponse(httpResponse, httpResponseBody);

	if (err) {
		self.defer.reject(err);
	} else if (httpResponse.statusCode === 401) {
		self.getAccessToken().then(self.directReq.bind(self));
	} else if (httpResponse.statusCode !== 200) {
		self.defer.reject(response);
	} else {
		self.defer.resolve(response);
	}
};

GnEndpoints.prototype.directReqCallback = function (err, httpResponse, bodyResponse) {
	var response = this.getResponse(httpResponse, bodyResponse);

	if (err) {
		this.defer.reject(err);
	} else if (httpResponse.statusCode !== 200) {
		this.defer.reject(response);
	} else {
		this.defer.resolve(response);
	}
};


module.exports = GnEndpoints;