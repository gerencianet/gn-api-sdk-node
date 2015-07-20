## Updating charges

### Changing the metadata

You can update the `custom_id` or the `notification_url` of a charge at any time you want:

```js
gerencianet
  .updateChargeMetadata({
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

If everything goes well, the return will be:

```js
{
  "code": 200
}
```

### Updating the expiration date of a billet

To update or set a expiration date to a charge, the charge must have a `waiting` or `unpaid` status, and the payment method choosed must be `banking_billet`.

If the charge contemplates these requirements, you just have to provide the charge id and a new expiration date:

```js
gerencianet
  .updateBillet({
    charge_id: 233,
    expire_at: '2020-12-12'
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

If everything goes well, the return will be:

```js
{
  "code": 200
}
```
