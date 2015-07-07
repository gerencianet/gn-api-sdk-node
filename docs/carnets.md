## Creating carnet billets

Carnet is a payment method that generates a set of charges with the same payment information and customer in all of them.

To generate a carnet, you have as required: the items, a customer and the number of repeats (or parcels).

If you want, you can also send some additional informations:

The metadata information (like in the banking billet), with notification_url and/or custom_id
- The expiration date to the first charge;
- If the carnet must be send by post office service (choosing, inclusive, if you or your client must receive it);
- If the total value must be split among every charges or if each charge must have the value;
- The instructions to the carnet (At most 4 lines).

Instantiate the module:

```js
var Gerencianet = require('gn-api-sdk-node');
var gerencianet = new Gerencianet(options);
```

### Setting the required properties to a carnet:
`required`

```js
var carnetInput = {
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
  repeats: 4
}
```

### Setting metadata to a carnet:
`optional`

```js
var carnetInput = {
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
  metadata: {
    custom_id: 'my_id',
    notification_url: 'http://yourdomain.com'
  }
}
```

The `notification_url` property will be used for notifications once things happen with charges status, as when it's payment was approved, for example. More about notifications [here](https://github.com/gerencianet/gn-api-sdk-node/tree/master/docs/notifications.md). The `custom_id` property can be used to set your own reference to the carnet.

### Setting the expiration date to the first charge:
`optional`

If you don't set the expiration date for the first charge, the defaut value will be today + 8 days.

```js
var carnetInput = {
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
  expire_at: '2020-12-12'
}
```

### Setting post office service information:
`optional`

If you want the carnet to arrive at your house or at your client's house, you can count on Gerencianet's post office service. Just send an extra attribute:

```js
var carnetInput = {
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
  post_office_service: {
    send_to: 'customer'
  }
}
```

If `send_to` is set to *customer*, the carnet arrives at you customer's. If it is set to *seller*, just wait for it to arrive at your place!


### Setting the split value information
`optional`

By default, each parcel has the total value of the carnet as its value. If you want to divide the total value of the carnet by all the parcels, set the `split_items` property to *true*.

```js
var carnetInput = {
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
  split_items: true
}
```

### Setting instructions
`optional`

If you want the carnet billet to have extra instructions, it's possible to send a maximum of 4 different instructions with a maximum of 90 caracters, just as follows:

```js
var carnetInput = {
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
  instructions: [
    "Pay only with money",
    "Do not pay with gold"
  ]
}
```

### Finally, create the carnet:

```js
gerencianet
  .createCarnet(carnetInput)
  .then(function (carnet) {
    console.log('Response:', carnet);
  })
  .catch(function (err) {
    console.log('Error:', err);
  })
  .done();
```

Check out the response:

```js
{
  "code": 200,
  "data": {
    "carnet_id": 6,
    "cover": "https://visualizacao.gerencianet.com.br/emissao/28333_2385_ZEMAL5/A5CC-28333-61428-LEENA9/28333-61428-LEENA9",
    "charges": [{
        "charge_id": 357,
        "parcel": "1",
        "status": "waiting",
        "value": 2000,
        "expire_at": '2015-06-01',
        "url": "https://visualizacao.gerencianet.com.br/emissao/28333_2385_ZEMAL5/A5CL-28333-61428-LEENA9/28333-61428-LEENA9",
        "barcode": "00190.00009 01523.894002 00061.428181 1 64780000002000"
      }, {
        "charge_id": 358,
        "parcel": "2",
        "status": "waiting",
        "value": 2000,
        "expire_at": '2015-07-01',
        "url": "https://visualizacao.gerencianet.com.br/emissao/28333_2385_ZEMAL5/A5CL-28333-61428-LEENA9/28333-61429-CORZE4",
        "barcode": "00190.00009 01523.894002 00061.428181 8 65090000002000"
      }, {
        "charge_id": 359,
        "parcel": "3",
        "status": "waiting",
        "value": 2000,
        "expire_at": '2015-08-01',
        "url": "https://visualizacao.gerencianet.com.br/emissao/28333_2385_ZEMAL5/A5CL-28333-61428-LEENA9/28333-61430-HIRRA4",
        "barcode": "00190.00009 01523.894002 00061.428181 7 65400000002000"
      }, {
        "charge_id": 360,
        "parcel": "4",
        "status": "waiting",
        "value": 2000,
        "expire_at": '2015-09-01',
        "url": "https://visualizacao.gerencianet.com.br/emissao/28333_2385_ZEMAL5/A5CL-28333-61428-LEENA9/28333-61431-HIRRA4",
        "barcode": "00190.00009 01523.894002 00061.428181 5 65400000002000"
      }
    ]
  }
}
```

Notice that, as the `repeats` were set to 4, the output contains 4 charges with `waiting` status. The value of each charge is the sum of the items values, because the `split_items` property was set to *false*. Also notice that `expire_at` increases monthly.
