'use strict';

let Gerencianet = require('gn-api-sdk-node');
let options = require('../../credentials');

let body = {
    "pix": {
        "receberSemChave": true,
        "chaves": {
            "SUACHAVEPIX": {
                "recebimento": {
                    "txidObrigatorio": false,
                    "qrCodeEstatico": {
                        "recusarTodos": false
                    }
                }
            }
        }
    }
}

let gerencianet = new Gerencianet(options);

gerencianet.pixUpdateSettings([],body)
    .then(console.log)
    .catch(console.log)
    .done();
