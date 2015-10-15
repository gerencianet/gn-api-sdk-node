## Updating charges

### Changing the metadata

You can update the `custom_id` or the `notification_url` of a charge:

```js
var params = {
  id: 1008
}

var body = {
  notification_url: 'http://yourdomain.com',
  custom_id: 'my_new_id'
}

gerencianet
  .updateChargeMetadata(params, body)
  .then(console.log)
  .catch(console.log)
  .done();
```

If everything goes well, the return will be:

```js
{
  "code": 200
}
```

### Updating the expiration date of a billet

Only charges with status `waiting` or `unpaid` and with payment method `banking_billet` can have the `expire_at` changed:

```js
var params = {
  id: 1008
}

var body = {
  expire_at: '2020-12-12'
}

gerencianet
  .updateBillet(params, body)
  .then(console.log)
  .catch(console.log)
  .done();
```

If everything goes well, the return will be:

```js
{
  "code": 200
}
```
