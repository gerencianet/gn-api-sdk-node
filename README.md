# gn-api-sdk-node

A nodejs module for integration of your backend with the payment services
provided by [Gerencianet](http://gerencianet.com.br).

:warning: **This module is under development and is based on the new API that Gerencianet is about to release. It won't work in production by now.**

[![Build Status](https://travis-ci.org/franciscotfmc/gn-api-sdk-node.svg?branch=master)](https://travis-ci.org/franciscotfmc/gn-api-sdk-node)
[![Code Climate](https://codeclimate.com/github/franciscotfmc/gn-sdk-api-node/badges/gpa.svg)](https://codeclimate.com/github/franciscotfmc/gn-sdk-api-node)
[![Test Coverage](https://codeclimate.com/github/franciscotfmc/gn-sdk-api-node/badges/coverage.svg)](https://codeclimate.com/github/franciscotfmc/gn-sdk-api-node)
[![Dependency Status](https://david-dm.org/franciscotfmc/gn-api-sdk-node.svg)](https://david-dm.org/franciscotfmc/gn-api-sdk-node)

## Installation

```bash
$ npm install gn-api-sdk-node
```

## Usage

Require the module:

```js
var Gerencianet = require('gn-api-sdk-node');
```

Set your credentials and whether you want to use sandbox or not:

```js
var options = {
  clientId: 'your_client_id',
  clientSecret: 'your_client_secret',
  sandbox: true
}
```

Instantiate the module passing your options:

```js
var gerencianet = new Gerencianet(options);
```

Create charge and payment objects:

```js
var chargeInput = {
  items: [{
    name: 'Product A',
    value: 1000,
    amount: 2
  }]
}

var clientInput = {
  charge_id: '',
  name: '',
  email: '',
  document: '',
  birth: '',
  phone_number: ''
}

var paymentMethodInput = {
  method: 'visa',
  total: 5000
}

var paymentInput = {
  charge_id: '',
  payment: {
    credit_card: {
      parcels: 1,
      payment_token: 'ed60dae38eb02d3c400ad5e6a35d56ee5b39aeaf',
      billing_address: {
        street: 'Rua 3',
        number: 10,
        neighborhood: 'Lagoa',
        zipcode: '35400000',
        city: 'Ouro Preto',
        state: 'MG'
      }
    }
  }
}
```

Supposing you want to create a customer and generate a transaction, let's
create the callback functions:

```js
var createClient = function(response) {
  console.log('Charge:', response);
  clientInput.charge_id = response.charge.id;
  paymentInput.charge_id = response.charge.id;
  return gerencianet.createClient(clientInput);
}

var createPayment = function(response) {
  console.log('Client', response);
  return gerencianet.createPayment(paymentInput)
}
```

The last thing you need to do is call the API for generating a charge, a customer and a payment. It is worth to mention
that the sdk works with promises, that means you can append the function calls:

```js
gerencianet
  .createCharge(chargeInput)
  .then(createClient)
  .then(createPayment)
  .then(function(payment) {
    console.log('Payment:', payment);
  })
  .catch(function(err) {
    console.log('Error:', err);
  });
```

## License

(The MIT License)

    Copyright (c) 2015 TJ Gerencianet <suportetecnico@gerencianet.com.br>

    Permission is hereby granted, free of charge, to any person obtaining
    a copy of this software and associated documentation files (the
    'Software'), to deal in the Software without restriction, including
    without limitation the rights to use, copy, modify, merge, publish,
    distribute, sublicense, and/or sell copies of the Software, and to
    permit persons to whom the Software is furnished to do so, subject to
    the following conditions:

    The above copyright notice and this permission notice shall be
    included in all copies or substantial portions of the Software.

    THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
    EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
    MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
    IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
    CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
    TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
    SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
