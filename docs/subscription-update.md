## Updating subscriptions

### Changing the metadata

You can update the `custom_id` or the `notification_url` of a subscription at any time you want.

Is important to know that it updates all the charges of the subscription. If you want to update only one, see [Updating charges](/docs/charge-update).

```js
gerencianet
  .updateSubscriptionMetadata({
    charge_id: 233,
    notification_url: 'http://yourdomain.com/my_new_route',
    custom_id: 'my_new_id'
  })
  .then(function (notification) {
    console.log('Response:',
      util.inspect(notification, false, null));
  })
  .catch(function (err) {
    console.log('Error:', err);
  })
  .done();
```

If everything goes well. the return will be:

```js
{
  "code": 200
}
```