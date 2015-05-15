## Creating subscriptions

Instantiate the module:

```js
var Gerencianet = require('gn-api-sdk-node');
var gerencianet = new Gerencianet(options);
```

If you ever have to recurrently charge your clients, you can create a different kind of charge, one that belongs to a subscription. This way, subsequent charges will be automatically created and charged in your customers credit card, based on the interval and repetitions supplied in the subscription object.

It's worth to mention that this mechanics is triggered only if the customer commits the subscription. In other words, it takes effect when the customer pays the first charge.

The example below will create a charge including the subscription attributes. This attributes specify that we'll have a subscription that lasts three months, given the one month interval:

```js
var chargeInput = {
  items: [{
    name: 'Product A',
    value: 1000,
    amount: 2
  }],
  subscription: {
    interval: 1,
    repeats: 3
  }
}
```

Finally, create the charge:

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

## Canceling subscriptions

You can cancel subscriptions at any time:

```js
gerencianet
  .cancelSubscription({
    subscription_id: 14,
    customer: true
  })
  .then(function (subscription) {
    console.log(subscription);
  })
  .catch(function (err) {
    console.log('Error:', err);
  })
  .done();
```

The `customer` attribute above indicates who is triggering the cancellation, the customer or the one providing the service. In this case, the customer decided not to continue with the subscription.