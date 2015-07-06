## Creating subscriptions

If you ever have to recurrently charge your clients, you can create a different kind of charge, one that belongs to a subscription. This way, subsequent charges will be automatically created and charged in your customers credit card, based on the interval and repetitions supplied in a plan configuration.

The `repeats` parameter defines how many times the transaction will be repeated. If you don't pass it, the subscription will create charges indefinitely.

The `interval` parameter defines the interval, in months, that a charge has to be generated. The minimum value is 1, and the maximum is 24. So, define "1" if you want monthly creations for example.

It's worth to mention that this mechanics is triggered only if the customer commits the subscription. In other words, it takes effect when the customer pays the first charge.

At first, you need to to create a plan. Then, you create a charge passing a plan_id to generate a subscription. You can use the same plan_id whenever you want.

First instantiate the module:

```js
var Gerencianet = require('gn-api-sdk-node');
var gerencianet = new Gerencianet(options);
```

### Creating and setting a plan to a subscription:

```js
var planInput = {
    name: 'My first plan',
    repeats: 24,
    interval: 2
}

gerencianet
  .createPlan(planInput)
  .then(function (plan) {
    console.log('Response:', plan);
  })
  .catch(function (err) {
    console.log('Error:', err);
  })
  .done();
```

### Creating the charge:

```js
var chargeInput = {
  items: [{
    name: 'Product 1',
    value: 1000,
    amount: 2
  }],
  plan_id: 1
}

gerencianet
  .createCharge(chargeInput)
  .then(function (charge) {
    console.log('Response:', charge);
  })
  .catch(function (err) {
    console.log('Error:', err);
  })
  .done();
}
```

### Deleting a plan:
*(works just for plans that hasn't a subscription associated):*

```js
gerencianet
  .deletePlan({
    plan_id: 1
  })
  .then(function (plan) {
    console.log('Response:',
      util.inspect(plan, false, null));
  })
  .catch(function (err) {
    console.log('Error:', err);
  })
  .done();
```

### Canceling subscriptions

You can cancel active subscriptions at any time:

```js
gerencianet
  .cancelSubscription({
    subscription_id: 14,
    customer: true
  })
  .then(console.log)
  .catch(function (err) {
    console.log('Error:', err);
  })
  .done();
```

```js
{
  "code": 200
}
```

The `customer` attribute above indicates who is triggering the cancellation, the customer or the one providing the service. In this case, the customer decided not to continue with the subscription.