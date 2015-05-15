## Detailing charges

Instantiate the module:

```js
var Gerencianet = require('gn-api-sdk-node');
var gerencianet = new Gerencianet(options);
```

It's very simple to get details from a charge. You just need the id:

```js
gerencianet
  .detailCharge({
    charge_id: 233
  })
  .then(function (charge) {
    console.log('Response:',
      util.inspect(charge, false, null));
  })
  .catch(function (err) {
    console.log('Error:', err);
  })
  .done();
```

## Detailing subscriptions

Works just like the last example, but here you pass the subscription id:

```js
gerencianet
  .detailSubscription({
    subscription_id: 11
  })
  .then(function (subscription) {
    console.log('Response:',
      util.inspect(subscription, false, null));
  })
  .catch(function (err) {
    console.log('Error:', err);
  })
  .done();
```

Note that if you detail a charge that belongs to a subscription, the response will have a subscription_id. If you need the subscription information, you can concat the calls like this:

```js

var chargeInput = {
  charge_id: 233
}

var detailChargeCallback = function (charge) {
  return {
    subscription_id: charge.subscription_id;
  }
}

gerencianet
  .detailCharge(chargeInput)
  .then(detailChargeCallback)
  .then(gerencianet.detailSubscription)
  .then(console.log)
  .catch(console.log)
  .done();
```
