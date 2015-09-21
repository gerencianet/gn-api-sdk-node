## Updating subscriptions

### Changing the metadata

You can update the `custom_id` or the `notification_url` of a subscription.

It is important to keep in mind that all the subscription charges will be updated. If you want to update only one, check [Updating charges](/docs/charge-update).

```js
var params = {
  id: 1009
}

var body = {
  notification_url: 'http://yourdomain.com',
  custom_id: 'my_new_id'
}

gerencianet
  .updateSubscriptionMetadata(params, body)
  .then(console.log)
  .catch(console.log)
  .done();
```

If everything goes well. the return will be:

```js
{
  "code": 200
}
```
