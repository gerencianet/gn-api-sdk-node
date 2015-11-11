## Paying subscriptions

There is two ways of giving sequence to a subscription *banking billet* or *credit card*.

Instantiate the module:

```js
var Gerencianet = require('gn-api-sdk-node');
var gerencianet = new Gerencianet(options);
```


### 1. Banking billets

To submit the payment with banking billet, you just need define the customer and the expire at to first charge:

```js
var tenDaysFromNow = moment()
  .add(10, 'days')
  .format('YYYY-MM-DD 00:00:00');

var params = {
  id: 1000
}

var body = {
  payment: {
    banking_billet: {
      expire_at: tenDaysFromNow,
      customer: {
        name: 'Gorbadoc Oldbuck',
        email: 'oldbuck@gerencianet.com.br',
        cpf: '04267484171',
        birth: '1977-01-15',
        phone_number: '5144916523'
      }
    }
  }
}

gerencianet
  .paySubscription(params, body)
  .then(console.log)
  .catch(console.log)
  .done();
```


### 2. Credit card

In case of credit card, it's necessary to use the customer's *credit card* to submit the payment. As explained in the last section of this page, a `payment_token` represents a credit card:

```js
var params = {
  id: 1000
}

var body = {
  payment: {
    credit_card: {
      payment_token: '33ffd6d982cd63f767fb2ee5c458cd39e8fc0ea0',
      billing_address: {
        street: 'Av. JK',
        number: 909,
        neighborhood: 'Bauxita',
        zipcode: '35400000',
        city: 'Ouro Preto',
        state: 'MG'
      },
      customer: {
        name: 'Gorbadoc Oldbuck',
        email: 'oldbuck@gerencianet.com.br',
        cpf: '04267484171',
        birth: '1977-01-15',
        phone_number: '5144916523'
      }
    }
  }
}

gerencianet
  .paySubscription(params, body)
  .then(console.log)
  .catch(console.log)
  .done();
```

If everything went well, the response will come with total value:

```js
{
  "code": 200,
  "data": {
    "subscription_id": 11,
    "status": "active",
    "plan": {
      "id": 1000,
      "interval": 2,
      "repeats": null
    },
    "charge": {
      "id": 1053,
      "status": "waiting"
    },
    "total": 1150,
    "payment": "credit_card"
  }
}
```


For getting installment values, including interests, check [Getting Installments](/docs/payment-data.md).


##### Payment tokens

A `payment_token` represents a credit card number at Gerencianet.

For testing purposes, you can go to your application playground in your Gerencianet's account. At the payment endpoint you'll see a button that generates one token for you. This payment token will point to a random test credit card number.

When in production, it will depend if your project is a web app or a mobile app.

For web apps you should follow this [guide](https://api.gerencianet.com.br/checkout/card). It basically consists of copying/pasting a script tag in your checkout page.

For mobile apps you should use this [SDK for Android](https://github.com/gerencianet/gn-api-sdk-android) or this [SDK for iOS](https://github.com/gerencianet/gn-api-sdk-ios).

### 3. Discount by payment method

It is possible to set discounts based on payment. You just need to add an `discount` attribute within `banking_billet` or `credit_card` tags.

The example below shows how to do this for credit card payments.

```js
var body = {
  payment: {
    credit_card: {
      installments: 1,
      payment_token: '6426f3abd8688639c6772963669bbb8e0eb3c319',
      discount: {
        type: 'currency',
        value: 1000
      },
      billing_address: {
        street: 'Av. JK',
        number: 909,
        neighborhood: 'Bauxita',
        zipcode: '35400000',
        city: 'Ouro Preto',
        state: 'MG'
      },
      customer: {
        name: 'Gorbadoc Oldbuck',
        email: 'oldbuck@gerencianet.com.br',
        cpf: '04267484171',
        birth: '1977-01-15',
        phone_number: '5144916523'
      }
    }
  }
}
```

Discounts for banking billets works similar to credit cards. You just need to add the `discount` attribute.

The discount may be applied as percentage or with a previous calculated value.

The `type` property is used to specify how the discount will work. It may be set as *currency* or *percentage*.

The first will discount the amount specified in `value` property as *cents*, so, in the example above the amount paid by the customer will be equal `(Charge's value) - R$ 10,00`.

However, if the discount type is set to *percentage*, the amount will be `(Charge's value) - 10%`.
