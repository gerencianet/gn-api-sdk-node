## Paying charges

Instantiate the module:

```js
var Gerencianet = require('gn-api-sdk-node');
var gerencianet = new Gerencianet(options);
```

There are two ways of giving sequence to a charge. One can generate a **banking billet** so it is payable until its due date, or one can use its **credit card** to approve the payment.

### 1. Banking billets

Generating banking billets from a charge is deadly simple. Provide the charge id and an optional expiration date:

```js
var tenDaysFromNow = moment()
  .add(10, 'days')
  .format('YYYY-MM-DD 00:00:00');

var paymentInput = {
  charge_id: 242,
  payment: {
    banking_billet: {
      expire_at: tenDaysFromNow
    }
  }
}

gerencianet
  .createPayment(paymentInput)
  .then(console.log)
  .catch(console.log)
  .done();
```

If you don't need an expiration date, keep the `banking_billet` object empty like this:

```js
var paymentInput = {
  charge_id: 242,
  payment: {
    banking_billet: {}
  }
}
```

You'll receive the payment info in the callback, such as the barcode and the billet link:

```js
{
  "code": 200,
  "data": {
    "charge_id": 242,
    "total": 1150,
    "payment": "banking_billet",
    "barcode": "00190.00009 01523.894002 00059.161182 9 64350000001150",
    "link": "https://visualizacao.gerencianet.com.br/emissao/28333_2139_RRABRA7/A4XB-28333-59161-BRANAE4",
    "expire_at": "2015-05-21"
  }
}
```

### 2. Credit card

The most common payment method is to use a credit card in order to make things happen faster. Paying a charge with a credit card in Gerencianet is as simples as generating a banking billet, as seen above.

The difference here is that we need to provide some extra information, as a `billing_address` and a `payment_token`. The former is used to make an anti-fraud analyze before accepting/appoving the payment, the latter identifies a credit card at Gerencianet, so that you don't need to bother about keeping track of credit card numbers. The `installments` attribute is self-explanatory.

We'll talk about getting payment tokens later. For now, let's take a look at the snipet that does the work we're aiming for:

```js
var paymentInput = {
  charge_id: 223,
  payment: {
    credit_card: {
      installments: 1,
      payment_token: '6426f3abd8688639c6772963669bbb8e0eb3c319',
      billing_address: {
        street: 'Street 3',
        number: 10,
        neighborhood: 'Bauxita',
        zipcode: '35400000',
        city: 'Ouro Preto',
        state: 'MG'
      }
    }
  }
}

gerencianet
  .createPayment(paymentInput)
  .then(console.log)
  .catch(console.log)
  .done();
```

If everything went well, the response will come with the total value, installments number and the value of each installment:

```js
{
  "code": 200,
  "data": {
    "charge_id": 223,
    "total": 1150,
    "payment": "credit_card",
    "installments": 1,
    "installment_value": 1150
  }
}
```

##### Payment tokens

A `payment_token` represents a credit card number at Gerencianet.

For testing purposes, you can go to your application playground in your Gerencianet's account. At the payment endpoint you'll see a button that generates one token for you. This payment token will point to a random test credit card number.

When in production, it will depend if your project is a web app or a mobile app.

For web apps you should follow this [guide](https://api.gerencianet.com.br/checkout/card). It basically consists of copying/pasting a script tag in your checkout page.

For mobile apps you should use this [SDK for Android](https://github.com/franciscotfmc/gn-api-sdk-android) or this [SDK for iOS](https://github.com/thomazfeitoza/gn-api-sdk-ios).