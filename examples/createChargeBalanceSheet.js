'use strict';

var Gerencianet = require('gn-api-sdk-node');
var credentials = require('./credentials');

var options = {
  client_id: credentials.client_id,
  client_secret: credentials.client_secret,
  sandbox: true
};

var params = {
  id: 0
};

var body = {
  title: "Balancete Demonstrativo",
  body: [
    {
      header: "Demonstrativo de Consumo",
      tables: [
        {
          rows: [
            [
              {
                align: "left",
                color: "#000000",
                style: "bold",
                text: "Exemplo de despesa",
                colspan: 2
              },
              {
                align: "left",
                color: "#000000",
                style: "bold",
                text: "Total lançado",
                colspan: 2
              }
            ],
            [
              {
                align: "left",
                color: "#000000",
                style: "normal",
                text: "Instalação",
                colspan: 2
              },
              {
                align: "left",
                color: "#000000",
                style: "normal",
                text: "R$ 100,00",
                colspan: 2
              }
            ]
          ]
        }
      ]
    },
    {
      header: "Balancete Geral",
      tables: [
        {
          rows: [
            [
              {
                align: "left",
                color: "#000000",
                style: "normal",
                text: "Confira na documentação da Gerencianet todas as configurações possíveis de um boleto balancete.",
                colspan: 4
              }
            ]
          ]
        }
      ]
    }
  ]
};

var gerencianet = new Gerencianet(options);

gerencianet
  .createChargeBalanceSheet(params, body)
  .then(console.log)
  .catch(console.log)
  .done();