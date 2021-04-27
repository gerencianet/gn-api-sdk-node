'use strict';

var moment = require('moment');
var Gerencianet = require('gn-api-sdk-node');
var options = require('./credentials');


var tomorrow = moment()
  .add(1, 'days')
  .format('YYYY-MM-DD');

var params = {
  id: 0
}

var body = {
  payment: {
    banking_billet: {
      expire_at: tomorrow,
      customer: {
        name: 'Gorbadoc Oldbuck',
        email: 'oldbuck@gerencianet.com.br',
        cpf: '04267484171',
        birth: '1977-01-15',
        phone_number: '5144916523'
      }
    }
  }
}

var gerencianet = new Gerencianet(options);

gerencianet
  .payCharge(params, body)
  .then(console.log)
  .catch(console.log)
  .done();