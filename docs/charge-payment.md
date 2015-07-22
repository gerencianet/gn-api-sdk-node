## Paying charges

There are two ways of giving sequence to a charge. You can generate a banking billet so it is payable until its due date, or can use the customer's credit card to submit the payment.

Instantiate the module:

```js
var Gerencianet = require('gn-api-sdk-node');
var gerencianet = new Gerencianet(options);
```

### 1. Banking billets

Setting banking billet as a charge's payment method is simple. You have to use `banking_billet` as the payment method and inform the `charge_id`.

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
  .payCharge(params, body)
  .then(console.log)
  .catch(console.log)
  .done();
```

If you don't set the `expire_at` attribute, the date will be the current day + 3.

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

If you want the banking billet to have extra instructions, it's possible to send a maximum of 4 different instructions with a maximum of 90 caracters, just as follows:

```js
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
      },
      instructions: [
        "Pay only with money",
        "Do not pay with gold"
      ]
    }
  }
}
```

### 2. Credit card

The most common payment method is to use a credit card in order to make things happen faster. Paying a charge with a credit card in Gerencianet is as simples as generating a banking billet, as seen above.

The difference here is that we need to provide some extra information, as a `billing_address` and a `payment_token`. The former is used to make an anti-fraud analyze before accepting/appoving the payment, the latter identifies a credit card at Gerencianet, so that you don't need to bother about keeping track of credit card numbers. The `installments` attribute is self-explanatory.

We'll talk about getting payment tokens later. For now, let's take a look at the snipet that does the work we're aiming for:

```js
var body = {
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

var params = {
  id: 1000
}

gerencianet
  .payCharge(params, body)
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

For mobile apps you should use this [SDK for Android](https://github.com/gerencianet/gn-api-sdk-android) or this [SDK for iOS](https://github.com/gerencianet/gn-api-sdk-ios).