## Creating charge with a customer associated

Instantiate the module:

```js
var Gerencianet = require('gn-api-sdk-node');
var gerencianet = new Gerencianet(options);
```

Charges belong to customers. Customers have many charges. Following this logic, you will have to associate a customer to a charge at some point. If you already know him, you can create the charge with the customer inside.

Create the charge object including a customer object:

```js
var chargeInput = {
  items: [{
    name: 'Product A',
    value: 1000,
    amount: 2
  }],
  customer: {
    name: 'Gorbadoc Oldbuck',
    email: 'oldbuck@gerencianet.com.br',
    document: '04267484171',
    birth: '1977-01-15',
    phone_number: '5044916523'
  },
  metadata: {
    notification_url: 'http://google.com'
  }
}
```

Create the charge:

```js
gerencianet
  .createCharge(chargeInput)
  .then(console.log)
  .catch(console.log);
```

Check out the response:

```js
{
  "code": 200,
  "charge": {
    "id": 253,
    "total": 2000,
    "status": "new",
    "custom_id": null,
    "created_at": "2015-05-18"
  }
}
```

Observe that charges have an optional param inside `metadata` called `notification_url`. Each charge can have it's own `notification_url` that will be used for notifications once things happen with charges status, as when it's payment was approved, for example. More about notifications [here](https://github.com/franciscotfmc/gn-api-sdk-node/tree/master/docs/notifications.md).