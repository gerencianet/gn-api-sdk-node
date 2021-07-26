'use strict';

var moment = require('moment');
var Gerencianet = require('gn-api-sdk-node');
var options = require('../../credentials');


var expireAt = moment()
  .add(3, 'days')
  .format('YYYY-MM-DD');

var params = {
  id: 0
};

var body = {
  billet_discount: 0,
  card_discount: 0,
  message: '',
  expire_at: expireAt,
  request_delivery_address: false,
  payment_method: 'all'
};

var gerencianet = new Gerencianet(options);

gerencianet
  .updateChargeLink(params, body)
      .then((resposta) => {
        console.log(resposta)
    })
    .catch((error) => {
        console.log(error);
    })
    .done();
