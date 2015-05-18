# gn-api-sdk-node

A nodejs module for integration of your backend with the payment services
provided by [Gerencianet](http://gerencianet.com.br).

[![NPM](https://nodei.co/npm/gn-api-sdk-node.png?downloads=true&stars=true)](https://nodei.co/npm/gn-api-sdk-node/)

:warning: **This module is under development and is based on the new API that Gerencianet is about to release. It won't work in production by now.**

[![Build Status](https://travis-ci.org/franciscotfmc/gn-api-sdk-node.svg?branch=master)](https://travis-ci.org/franciscotfmc/gn-api-sdk-node)
[![Code Climate](https://codeclimate.com/github/franciscotfmc/gn-api-sdk-node/badges/gpa.svg)](https://codeclimate.com/github/franciscotfmc/gn-api-sdk-node)
[![Test Coverage](https://codeclimate.com/github/franciscotfmc/gn-api-sdk-node/badges/coverage.svg)](https://codeclimate.com/github/franciscotfmc/gn-api-sdk-node/coverage)
[![Dependency Status](https://david-dm.org/franciscotfmc/gn-api-sdk-node.svg)](https://david-dm.org/franciscotfmc/gn-api-sdk-node)
[![npm version](https://badge.fury.io/js/gn-api-sdk-node.svg)](http://badge.fury.io/js/gn-api-sdk-node)



## Installation

```bash
$ npm install gn-api-sdk-node
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
  .then(function(charge) {
    console.log('Response:', charge);
  })
  .catch(function(err) {
    console.log('Error:', err);
  });
```

## Examples

To run the examples, clone this repo and install the dependencies:

```bash
$ git clone git@github.com:franciscotfmc/gn-api-sdk-node.git
$ cd gn-api-sdk-node/docs/examples
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

## Additional docs
- [Creating charges with shippings](https://github.com/franciscotfmc/gn-api-sdk-node/tree/master/docs/charge-with-shippings.md)
- [Creating charges associated to customers](https://github.com/franciscotfmc/gn-api-sdk-node/tree/master/docs/charge-with-customer.md)
- [Associating customers to charges subsequently](https://github.com/franciscotfmc/gn-api-sdk-node/tree/master/docs/associate-customer.md)
- [Subscriptions](https://github.com/franciscotfmc/gn-api-sdk-node/tree/master/docs/subscriptions.md)
- [Detailing charges and subscriptions](https://github.com/franciscotfmc/gn-api-sdk-node/tree/master/docs/detailing.md)
- [Paying a charge](https://github.com/franciscotfmc/gn-api-sdk-node/tree/master/docs/payments.md)
- [Notifications](https://github.com/franciscotfmc/gn-api-sdk-node/tree/master/docs/notifications.md)

## License

[MIT](LICENSE)
