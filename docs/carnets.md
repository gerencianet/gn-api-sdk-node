## Creating carnet billets

Carnet is a payment method that generates a bundle of charges with the same payment information and customer.

In order to generate a carnet, you'll need the items, the customer, the expiration date of the first charge and the number of repeats (or parcels).

The carnets can also be generated with the `metadata` attribute, just like in the banking billet, containing the `notification_url` and/or `custom_id`.

There are other optional params:

- `split_items`, identifying if the total value must be splitted among the charges (defaults to `false`)
- The carnet `message`
- The carnet `configurations`

Instantiate the module:

```js
var Gerencianet = require('gn-api-sdk-node');
var gerencianet = new Gerencianet(options);
```

### Required properties:

```js
var body = {
  items: [{
    name: 'Carnet Item 1',
    value: 1000,
    amount: 2
  }],
  customer: {
    name: 'Gorbadoc Oldbuck',
    email: 'oldbuck@gerencianet.com.br',
    cpf: '04267484171',
    birth: '1977-01-15',
    phone_number: '5144916523'
  },
  repeats: 12,
  expire_at: '2020-06-01'
}
```

### Required properties plus metadata **(optional)**:

```js
var body = {
  items: [{
    name: 'Carnet Item 1',
    value: 1000,
    amount: 2
  }],
  customer: {
    name: 'Gorbadoc Oldbuck',
    email: 'oldbuck@gerencianet.com.br',
    cpf: '04267484171',
    birth: '1977-01-15',
    phone_number: '5144916523'
  },
  repeats: 4,
  expire_at: '2020-06-01',
  metadata: {
    custom_id: 'my_id',
    notification_url: 'http://yourdomain.com'
  }
}
```

The `notification_url` property will be used for sending notifications once things happen with charges statuses, as when it's payment was approved, for example. More about notifications [here](https://github.com/gerencianet/gn-api-sdk-node/tree/master/docs/notifications.md). The `custom_id` property can be used to set your own reference to the carnet.

### split_items attribute **(optional)**

By default, each parcel has the total value of the carnet. If you want to divide the total value among the parcels, change `split_items` property to *true*.

```js
var body = {
  items: [{
    name: 'Carnet Item 1',
    value: 1000,
    amount: 2
  }],
  customer: {
    name: 'Gorbadoc Oldbuck',
    email: 'oldbuck@gerencianet.com.br',
    cpf: '04267484171',
    birth: '1977-01-15',
    phone_number: '5144916523'
  },
  repeats: 4,
  expire_at: '2020-06-01',
  split_items: true
}
```

### Setting message to customer **(optional)**

If you want the carnet billet to have a message to customer, it's possible to send a message with a maximum of 80 caracters, just as follows:

```js
var body = {
  items: [{
    name: 'Carnet Item 1',
    value: 1000,
    amount: 2
  }],
  customer: {
    name: 'Gorbadoc Oldbuck',
    email: 'oldbuck@gerencianet.com.br',
    cpf: '04267484171',
    birth: '1977-01-15',
    phone_number: '5144916523'
  },
  repeats: 4,
  expire_at: '2020-06-01',
  message: "The delivery time is counted in working days, not include weekends and holidays"
}
```

### Setting configurations **(optional)**

If you want the carnet billet to have own configurations. It's possible to send:
- `fine`: it's the amount charged after expiration. Ex.: If you want 2%, you must send 200.
- `interest`: it's the amount charged after expiration by day. Ex.: If you want 0.033%, you must send 33.

```js
var body = {
  items: [{
    name: 'Carnet Item 1',
    value: 1000,
    amount: 2
  }],
  customer: {
    name: 'Gorbadoc Oldbuck',
    email: 'oldbuck@gerencianet.com.br',
    cpf: '04267484171',
    birth: '1977-01-15',
    phone_number: '5144916523'
  },
  repeats: 4,
  expire_at: '2020-06-01',
  configurations: {
    fine: 200,
    interest: 33
  }
}
```


### Finally, create the carnet:

```js
gerencianet
  .createCarnet({}, body)
  .then(console.log)
  .catch(console.log)
  .done();
```

Check out the response:

```js
{
  "code": 200,
  "data": {
    "carnet_id": 1002,
    "cover": "https://visualizacao.gerencianet.com.br/emissao/28333_2385_ZEMAL5/A5CC-28333-61428-LEENA9/28333-61428-LEENA9",
    "charges": [{
        "charge_id": 357,
        "parcel": "1",
        "status": "waiting",
        "value": 2000,
        "expire_at": "2020-06-01",
        "url": "https://visualizacao.gerencianet.com.br/emissao/28333_2385_ZEMAL5/A5CL-28333-61428-LEENA9/28333-61428-LEENA9",
        "barcode": "00190.00009 01523.894002 00061.428181 1 64780000002000"
      }, {
        "charge_id": 358,
        "parcel": "2",
        "status": "waiting",
        "value": 2000,
        "expire_at": "2020-07-01",
        "url": "https://visualizacao.gerencianet.com.br/emissao/28333_2385_ZEMAL5/A5CL-28333-61428-LEENA9/28333-61429-CORZE4",
        "barcode": "00190.00009 01523.894002 00061.428181 8 65090000002000"
      }, {
        "charge_id": 359,
        "parcel": "3",
        "status": "waiting",
        "value": 2000,
        "expire_at": "2020-08-01",
        "url": "https://visualizacao.gerencianet.com.br/emissao/28333_2385_ZEMAL5/A5CL-28333-61428-LEENA9/28333-61430-HIRRA4",
        "barcode": "00190.00009 01523.894002 00061.428181 7 65400000002000"
      }, {
        "charge_id": 360,
        "parcel": "4",
        "status": "waiting",
        "value": 2000,
        "expire_at": "2020-09-01",
        "url": "https://visualizacao.gerencianet.com.br/emissao/28333_2385_ZEMAL5/A5CL-28333-61428-LEENA9/28333-61431-HIRRA4",
        "barcode": "00190.00009 01523.894002 00061.428181 5 65400000002000"
      }
    ]
  }
}
```

Notice that, as the `repeats` were set to 4, the output contains 4 charges with `waiting` status. The value of each charge is the sum of the items values, because the `split_items` property was set to *false*. Also notice that `expire_at` increases monthly.
