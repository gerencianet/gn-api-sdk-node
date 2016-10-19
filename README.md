# gn-api-sdk-node

> A nodejs module for integration of your backend with the payment services
provided by [Gerencianet](http://gerencianet.com.br).

[![NPM](https://nodei.co/npm/gn-api-sdk-node.png?downloads=true&stars=true)](https://nodei.co/npm/gn-api-sdk-node/)

[![Build Status](https://travis-ci.org/gerencianet/gn-api-sdk-node.svg)](https://travis-ci.org/gerencianet/gn-api-sdk-node)
[![Code Climate](https://codeclimate.com/github/gerencianet/gn-api-sdk-node/badges/gpa.svg)](https://codeclimate.com/github/gerencianet/gn-api-sdk-node)
[![Test Coverage](https://codeclimate.com/github/gerencianet/gn-api-sdk-node/badges/coverage.svg)](https://codeclimate.com/github/gerencianet/gn-api-sdk-node/coverage)
[![Dependency Status](https://david-dm.org/gerencianet/gn-api-sdk-node.svg)](https://david-dm.org/gerencianet/gn-api-sdk-node)
[![npm version](https://badge.fury.io/js/gn-api-sdk-node.svg)](http://badge.fury.io/js/gn-api-sdk-node)


## Installation

```bash
$ npm install gn-api-sdk-node
```
## Tested with

```
node 0.12.7, 4.4.0 and 4.4.4
```


## Basic usage

Require the module:

```js
var Gerencianet = require('gn-api-sdk-node');
```

Set your credentials and whether you want to use sandbox or not:

```js
var options = {
  client_id: 'your_client_id',
  client_secret: 'your_client_secret',
  sandbox: true
}
```

Instantiate the module passing your options:

```js
var gerencianet = new Gerencianet(options);
```

Create a charge:

```js
var chargeInput = {
  items: [{
    name: 'Product A',
    value: 1000,
    amount: 2
  }]
}

gerencianet
  .createCharge(chargeInput)
  .then(console.log)
  .catch(console.log)
  .done();
```

## Examples

To run the examples, clone this repo and install the dependencies:

```bash
$ git clone git@github.com:gerencianet/gn-api-sdk-node.git
$ cd gn-api-sdk-node/examples
$ npm install
```

Set your oauth keys in credentials.js:

```js
module.exports = {
  client_id: 'your_client_id',
  client_secret: 'your_client_secret'
}
```

Then run the example you want:

```bash
$ node createCharge.js
```

## Tests

To run the test suite, first install the dependencies, then run `npm test`:

```bash
$ cd gn-api-sdk-node/
$ npm install
$ npm test
```

## Additional documentation

The full documentation with all available endpoints is in https://dev.gerencianet.com.br/.

## Changelog

[CHANGELOG](https://github.com/gerencianet/gn-api-sdk-node/tree/master/CHANGELOG.md)

## License

[MIT](LICENSE)
