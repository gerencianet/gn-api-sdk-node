## Creating carnet billets

Instantiate the module:

```js
var Gerencianet = require('gn-api-sdk-node');
var gerencianet = new Gerencianet(options);
```

A very common payment method, especially in Brazil, are the carnet billets. It is basically a set of a predefined amount of billets that are monthly due.

Create the carnet input object:

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
    document: '04267484171',
    birth: '1977-01-15',
    phone_number: '5144916523'
  },
  repeats: 4,
  split_items: false
}
```

Create the carnet:

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

Notice that, as the `repeats` were set to 3, the output contains 3 charges with `waiting` status. Also notice that `expire_at` increases monthly.

What would happen if we toggled `split_items`?

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
        "value": 500,
        "expire_at": '2015-06-01',
        "url": "https://visualizacao.gerencianet.com.br/emissao/28333_2385_ZEMAL5/A5CL-28333-61428-LEENA9/28333-61428-LEENA9",
        "barcode": "00190.00009 01523.894002 00061.428181 1 64780000002000"
      }, {
        "charge_id": 358,
        "parcel": "2",
        "status": "waiting",
        "value": 500,
        "expire_at": '2015-07-01',
        "url": "https://visualizacao.gerencianet.com.br/emissao/28333_2385_ZEMAL5/A5CL-28333-61428-LEENA9/28333-61429-CORZE4",
        "barcode": "00190.00009 01523.894002 00061.428181 8 65090000002000"
      }, {
        "charge_id": 359,
        "parcel": "3",
        "status": "waiting",
        "value": 500,
        "expire_at": '2015-08-01',
        "url": "https://visualizacao.gerencianet.com.br/emissao/28333_2385_ZEMAL5/A5CL-28333-61428-LEENA9/28333-61430-HIRRA4",
        "barcode": "00190.00009 01523.894002 00061.428181 7 65400000002000"
      }, {
        "charge_id": 360,
        "parcel": "4",
        "status": "waiting",
        "value": 500,
        "expire_at": '2015-09-01',
        "url": "https://visualizacao.gerencianet.com.br/emissao/28333_2385_ZEMAL5/A5CL-28333-61428-LEENA9/28333-61431-HIRRA4",
        "barcode": "00190.00009 01523.894002 00061.428181 5 65400000002000"
      }
    ]
  }
}
```

Observe that, in the above case, the value of each parcel changed from **2000** to **500**. We can infer that, when `split_items` is **true**, the value of each parcel will be the original total value divided by the number of parcels *(2000 / 4 = 500)*.

## Post office service

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
    document: '04267484171',
    birth: '1977-01-15',
    phone_number: '5144916523'
  },
  repeats: 3,
  post_office_service: {
    send_to: 'customer'
  }
  split_items: false
}
```

If `send_to` is set to *customer*, the carnet arrives at you customer's. If it is set to *seller*, just wait for it to arrive at your place!

## Detailing carnets

In order to retrieve carnets, just provide the carnet_id:

```js
gerencianet
  .detailCarnet({
    carnet_id: 6
  })
  .then(function (carnet) {
    console.log('Response:',
      util.inspect(carnet, false, null));
  })
  .catch(function (err) {
    console.log('Error:', err);
  })
  .done();
```
