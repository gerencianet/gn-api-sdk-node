## Creating charges

Charges belong to customers. Customers have many charges. Following this logic, you will have to associate a customer to a charge at some point. But the items, they have to be setted necessarily in the moment that you are creating the charge.

Instantiate the module:

```js
var Gerencianet = require('gn-api-sdk-node');
var gerencianet = new Gerencianet(options);
```

### Setting items to a charge:
`required`

```js
var chargeInput = {
  items: [{
    name: 'Product A',
    value: 1000,
    amount: 2
  }]
}

### Setting customer to a charge:
`required`, but you can [set after creation](/docs/associate-customer.md)  

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
    cpf: '04267484171',
    birth: '1977-01-15',
    phone_number: '5144916523'
  }
}
```

If the customer is a juridical person, it's necessary send the corporate name and CNPJ (brazilian document for juridical person):

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
    cpf: '04267484171',
    birth: '1977-01-15',
    phone_number: '5144916523'
    juridical_person: {
      corporateName: 'Fictional Company',
      cnpj: '52841284000142'
    }
  }
}
```

### Setting shippings to a charge:
`optional`

In order to be the most agnostic as possible about how the user handles shippings, the API just receives an array with the values. You can add as many as you want. Sometimes you'll want a shipping cost to be received by another person/account. In this case, you must provide the `payee_code`. The *Additional Shipping* in the example below will be passed on to the referenced account after the payment.

```js
var chargeInput = {
  items: [{
    name: 'Product A',
    value: 1000,
    amount: 2
  }],
  shippings: [{
    name: 'Default Shipping',
    value: 100
  }, {
    name: 'Additional Shipping',
    value: 120,
    payee_code: 'GEZTAMJYHA3DAMBQGAYDAMRYGMZTGMBRGI'
  }]
}
```

### Setting metadata to a charge:
`optional`

```js
var chargeInput = {
  items: [{
    name: 'Product A',
    value: 1000,
    amount: 2
  }],
  metadata: {
    custom_id: 'my_id',
    notification_url: 'http://yourdomain.com'
  }
}
```

The `notification_url` property will be used for notifications once things happen with charges status, as when it's payment was approved, for example. More about notifications [here](https://github.com/gerencianet/gn-api-sdk-node/tree/master/docs/notifications.md). The `custom_id` property can be used to set your own reference to the charge.

## Setting sending by post office service:

If you want the charge to arrive at your house or at your client's house, you can count on Gerencianet's post office service. Just send an extra attribute:

```js
var chargeInput = {
  items: [{
    name: 'Product A',
    value: 1000,
    amount: 2
  }],
  post_office_service: {
    send_to: 'customer'
  }
}
```

If `send_to` is set to *customer*, the charge arrives at you customer's. If it is set to *seller*, just wait for it to arrive at your place. It's awesome!

### Finally, create the charge:

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
  "data": {
    "charge_id": 1253,
    "total": 2000,
    "status": "new",
    "custom_id": null,
    "created_at": "2015-05-18 14:56:39"
  }
}
```