## Detailing charges

Instantiate the module:

```js
var Gerencianet = require('gn-api-sdk-node');
var gerencianet = new Gerencianet(options);
```

It's very simple to get details from a charge. You just need the id:

```js
var params = {
  id: 1001
}

gerencianet
  .detailCharge(params)
  .then(console.log)
  .catch(console.log)
  .done();
```

As response, you will receive all the information about the charge (including if it belongs to a subscription or carnet):

```js
{
  "code": 200,
  "data": {
    "charge_id": 233,
    "subscription_id": 12,
    "total": 2000,
    "status": "new",
    "custom_id": null,
    "created_at": "2015-05-14",
    "notification_url": "http://yourdomain.com",
    "items": [
      {
        "name": "Product 1",
        "value": 1000,
        "amount": 2
      }
    ],
    "history": [
      {
        "status": "new",
        "created_at": "2015-05-14 15:39:14"
      }
    ]
  }
}
```
