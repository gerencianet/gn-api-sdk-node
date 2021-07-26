'use strict';

let Gerencianet = require('gn-api-sdk-node');
let options = require('../../credentials');


let body = {
    "calendario": {
        "expiracao": 3600
    },
    "devedor": {
        "cpf": "94271564656",
        "nome": "Gorbadock Oldbuck"
    },
    "valor": {
        "original": "123.45"
    },
    "chave": "SUACHAVEPIX", // Informe sua chave Pix cadastrada na Gerencianet
    "infoAdicionais": [
        {
            "nome": "Pagamento em",
            "valor": "NOME DO SEU ESTABELECIMENTO"
        },
        {
            "nome": "Pedido",
            "valor": "NUMERO DO PEDIDO DO CLIENTE"
        }
    ]
}

let gerencianet = new Gerencianet(options);

gerencianet.pixCreateImmediateCharge([], body)
.then((resposta) => {
        console.log(resposta);
    })
    .catch((error) => {
        console.log(error);
    })
