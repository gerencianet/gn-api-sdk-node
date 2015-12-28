# gn-api-sdk-node

> A nodejs module for integration of your backend with the payment services
provided by [Gerencianet](http://gerencianet.com.br).

[![NPM](https://nodei.co/npm/gn-api-sdk-node.png?downloads=true&stars=true)](https://nodei.co/npm/gn-api-sdk-node/)

:warning: **Gerencianet API is under BETA version, meaning that it's not available for all users right now. If you're interested, you can always send an email to
suportetecnico@gerencianet.com.br and we'll enable it for your account**

[![Build Status](https://travis-ci.org/gerencianet/gn-api-sdk-node.svg)](https://travis-ci.org/gerencianet/gn-api-sdk-node)
[![Code Climate](https://codeclimate.com/github/gerencianet/gn-api-sdk-node/badges/gpa.svg)](https://codeclimate.com/github/gerencianet/gn-api-sdk-node)
[![Test Coverage](https://codeclimate.com/github/gerencianet/gn-api-sdk-node/badges/coverage.svg)](https://codeclimate.com/github/gerencianet/gn-api-sdk-node/coverage)
[![Dependency Status](https://david-dm.org/gerencianet/gn-api-sdk-node.svg)](https://david-dm.org/gerencianet/gn-api-sdk-node)
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
  .then(console.log)
  .catch(console.log)
  .done();
```

## Examples

To run the examples, clone this repo and install the dependencies:

```bash
$ git clone git@github.com:gerencianet/gn-api-sdk-node.git
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

## Additional documentation

### Charges

- [Creating charges](https://github.com/gerencianet/gn-api-sdk-node/tree/master/docs/charges.md)
- [Paying a charge](https://github.com/gerencianet/gn-api-sdk-node/tree/master/docs/charge-payment.md)
- [Detailing charges](https://github.com/gerencianet/gn-api-sdk-node/tree/master/docs/charge-detailing.md)
- [Updating informations](https://github.com/gerencianet/gn-api-sdk-node/tree/master/docs/charge-update.md)
- [Resending billet](https://github.com/gerencianet/gn-api-sdk-node/tree/master/docs/resend-billet.md)
- [Adding information to charge history](https://github.com/gerencianet/gn-api-sdk-node/tree/master/docs/charge-create-history.md)

### Carnets

- [Creating carnets](https://github.com/gerencianet/gn-api-sdk-node/tree/master/docs/carnets.md)
- [Detailing carnets](https://github.com/gerencianet/gn-api-sdk-node/tree/master/docs/carnet-detailing.md)
- [Updating informations](https://github.com/gerencianet/gn-api-sdk-node/tree/master/docs/carnet-update.md)
- [Adding information to carnet history](https://github.com/gerencianet/gn-api-sdk-node/tree/master/docs/carnet-create-history.md)
- [Resending carnet parcel](https://github.com/gerencianet/gn-api-sdk-node/tree/master/docs/carnet-resend-parcel.md)

### Subscriptions

- [Creating subscriptions](https://github.com/gerencianet/gn-api-sdk-node/tree/master/docs/subscriptions.md)
- [Paying a subscription](https://github.com/gerencianet/gn-api-sdk-node/tree/master/docs/subscription-payment.md)
- [Detailing subscriptions](https://github.com/gerencianet/gn-api-sdk-node/tree/master/docs/subscription-detailing.md)
- [Updating informations](https://github.com/gerencianet/gn-api-sdk-node/tree/master/docs/subscription-update.md)

### Marketplace

- [Creating a marketplace](https://github.com/gerencianet/gn-api-sdk-node/tree/master/docs/charge-with-marketplace.md)

### Notifications

- [Getting notifications](https://github.com/gerencianet/gn-api-sdk-node/tree/master/docs/notifications.md)

### Payments

- [Getting installments](https://github.com/gerencianet/gn-api-sdk-node/tree/master/docs/installments.md)

### All in one

- [Usage](https://github.com/gerencianet/gn-api-sdk-node/tree/master/docs/all-in-one.md)

## Changelog

[CHANGELOG](https://github.com/gerencianet/gn-api-sdk-node/tree/master/CHANGELOG.md)

## License

[MIT](LICENSE)
