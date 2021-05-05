'use strict';

var GnSdk = require('./lib/gn-sdk');

module.exports = function (options) {
  let credentials;

  if (options.sandbox) {
    credentials = {
      client_id: options.clientIdHomologacao,
      client_secret: options.clientSecretHomologacao,
      pathCert: options.pathCertHomologacao,
      sandbox: options.sandbox,
    };
  } else {
    credentials = {
      client_id: options.clientIdProducao,
      client_secret: options.clientSecretProducao,
      pathCert: options.pathCertProducao,
      sandbox: options.sandbox,
    };
  }
  if (options.partnerToken) {
    credentials.partnerToken = options.partnerToken;
  }
  if (options.validateMtls) {
    credentials.validateMtls = options.validateMtls;
  }

  return new GnSdk(credentials);
};
