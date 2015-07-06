## Paying subscriptions

There is only one way of giving sequence to a subscription: you need to use the customer's *credit card* to submit the payment.

As we know, the credit card information is confidential, so, you need to prepare your system to send this information in a securely way. See how to send it and receive the paymnet token in our official documentation. Here we show how to do the backend part.

Instantiate the module:

```js
var Gerencianet = require('gn-api-sdk-node');
var gerencianet = new Gerencianet(options);

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
  .paySubscription(paymentInput)
  .then(console.log)
  .catch(console.log)
  .done();
```

If everything went well, the response will come with total value, installments number and the value oh each installment:

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

To know every installment value including interests for each brand, you can see [Getting the Payment Data](/docs/payment-data.md).


##### Payment tokens

A `payment_token` represents a credit card number at Gerencianet.

For testing purposes, you can go to your application playground in your Gerencianet's account. At the payment endpoint you'll see a button that generates one token for you. This payment token will point to a random test credit card number.

When in production, it will depend if your project is a web app or a mobile app.

For web apps you should follow this [guide](https://api.gerencianet.com.br/checkout/card). It basically consists of copying/pasting a script tag in your checkout page.

For mobile apps you should use this [SDK for Android](https://github.com/gerencianet/gn-api-sdk-android) or this [SDK for iOS](https://github.com/gerencianet/gn-api-sdk-ios).