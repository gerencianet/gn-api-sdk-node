## Creating charges and sending them via post office service

Instantiate the module:

```js
var Gerencianet = require('gn-api-sdk-node');
var gerencianet = new Gerencianet(options);
```

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