'use strict';

var GnSdk = require('./lib/gn-sdk');

module.exports = function (options) {
	let credentials = {
		sandbox: options.sandbox,
		client_id: options.client_id,
		client_secret: options.client_secret,
		pathCert: options.pix_cert,
	};

	if (options.validateMtls) {
		credentials.validateMtls = options.validateMtls;
	}

	if (options.partner_token) {
		credentials.partner_token = options.partner_token;
	}

	return new GnSdk(credentials);
};
