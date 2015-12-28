## Updating carnets

### Changing the metadata

You can update the `custom_id` and the `notification_url` of a carnet at any time.

It's important to keep in mind that all the charges of the carnet will be updated. If you want to update only one charge, check [Updating charges](/docs/charge-update.md).

```js
var params = {
  id: 1004
}

var body = {
  notification_url: 'http://yourdomain.com/my_new_route',
  custom_id: 'my_new_id'
}

var gerencianet = new Gerencianet(options);

gerencianet
  .updateCarnetMetadata(params, body)
  .then(console.log)
  .catch(console.log)
  .done();
```

If everything goes well, the response will be:

```js
{
  "code": 200
}
```

### Updating the expiration date of a parcel

Only parcels with status `waiting` or `unpaid` can have expiration date set or updated:

```js
var params = {
  id: 1008,
  parcel: 1
}

var body = {
  expire_at: '2020-12-12'
}

var gerencianet = new Gerencianet(options);

gerencianet
  .updateParcel(params, body)
  .then(console.log)
  .catch(console.log)
  .done();
```

If everything goes well, the response will be:

```js
{
  "code": 200
}
```
