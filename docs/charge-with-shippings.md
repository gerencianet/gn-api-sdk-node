## Creating charges including shipping costs

Instantiate the module:

```js
var Gerencianet = require('gn-api-sdk-node');
var gerencianet = new Gerencianet(options);
```

In order to be the most agnostic as possible about how the user handles shippings, the API just receives an array with the values. You can add as many as you want. Sometimes you'll want a shipping cost to be received by another person/account. In this case, you must provide the `payee_code`. The *Additional Shipping* in the example below will be passed on to the referenced account after the payment.

Create the charge object including an array of shippings:

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

Create the charge:

```js
gerencianet
  .createCharge(chargeInput)
  .then(function(charge) {
    console.log('Response:', charge);
  })
  .catch(function(err) {
    console.log('Error:', err);
  });
```
