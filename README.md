# gn-api-sdk-node

> A nodejs module for integration of your backend with the payment services provided by [Gerencianet](http://gerencianet.com.br).

> Um módulo nodejs para integrar seu backend com os serviços de pagamento da [Gerencianet](http://gerencianet.com.br).

[![NPM](https://nodei.co/npm/gn-api-sdk-node.png?downloads=true&stars=true)](https://nodei.co/npm/gn-api-sdk-node/)

[![Build Status](https://travis-ci.org/gerencianet/gn-api-sdk-node.svg)](https://travis-ci.org/gerencianet/gn-api-sdk-node)
[![Code Climate](https://codeclimate.com/github/gerencianet/gn-api-sdk-node/badges/gpa.svg)](https://codeclimate.com/github/gerencianet/gn-api-sdk-node)
[![Test Coverage](https://codeclimate.com/github/gerencianet/gn-api-sdk-node/badges/coverage.svg)](https://codeclimate.com/github/gerencianet/gn-api-sdk-node/coverage)
[![Dependency Status](https://david-dm.org/gerencianet/gn-api-sdk-node.svg)](https://david-dm.org/gerencianet/gn-api-sdk-node)
[![npm version](https://badge.fury.io/js/gn-api-sdk-node.svg)](http://badge.fury.io/js/gn-api-sdk-node)


## Instalação

```bash
$ npm install gn-api-sdk-node
```

## Uso Básico

Importe o módulo:

```js
var Gerencianet = require('gn-api-sdk-node');
```

Insira suas credenciais e defina se deseja usar o sandbox ou não.
Você também pode usar o arquivo [examples/credentials.js](examples/credentials.js) de modelo.
```js
module.exports = {
	// PRODUÇÃO = false
	// HOMOLOGAÇÃO = true
	sandbox: false,

	// CREDENCIAIS DE PRODUÇÃO
	clientIdProducao: '',
	clientSecretProducao: '',
	pathCertProducao: '',

	// CREDENCIAIS DE HOMOLOGAÇÃO
	clientIdHomologacao: '',
	clientSecretHomologacao: '',
	pathCertHomologacao: '',

	// VALIDAR MTLS?
	validateMtls: false,
};
```

Instancie o módulo passando as options:

```js
var gerencianet = new Gerencianet(options);
```

Crie uma cobrança:

```js
var chargeInput = {
  items: [{
    name: 'Product A',
    value: 1000,
    amount: 2
  }]
}

gerencianet
  .createCharge({}, chargeInput)
  .then(console.log)
  .catch(console.log)
  .done();
```

## Exemplos

Para executar os exemplos, clone este repo e instale as dependências:

```bash
$ git clone git@github.com:gerencianet/gn-api-sdk-node.git
$ cd gn-api-sdk-node/examples
$ npm install
```

Defina suas credenciais em credentials.js:

```js
module.exports = {
	// PRODUÇÃO = false
	// HOMOLOGAÇÃO = true
	sandbox: false,

	// CREDENCIAIS DE PRODUÇÃO
	clientIdProducao: '',
	clientSecretProducao: '',
	pathCertProducao: '',

	// CREDENCIAIS DE HOMOLOGAÇÃO
	clientIdHomologacao: '',
	clientSecretHomologacao: '',
	pathCertHomologacao: '',

	// VALIDAR MTLS?
	validateMtls: false,
};
```

Em seguida, execute o exemplo que você deseja:

```bash
$ node createCharge.js
```


## Documentação

A documentação completa com todos os endpoints disponíveis você encontra em: https://dev.gerencianet.com.br/.

## Changelog

[CHANGELOG](https://github.com/gerencianet/gn-api-sdk-node/tree/master/CHANGELOG.md)

## License

[MIT](LICENSE)
