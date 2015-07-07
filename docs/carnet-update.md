## Updating carnets

### Changing the metadata

You can update the `custom_id` or the `notification_url` of a carnet at any time you want.

Is important to know that it updates all the charges of the carnet. If you want to update only one, see [Updating charges](/docs/charge-update.md).

```js
gerencianet
  .updateCarnetMetadata({
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

### Updating the expiration date of a parcel

To update or set an expiration date to a parcel, the parcel must have a `waiting` status. You just have to provide the `carnet_id`, the number of the parcel and a new expiration date:

```js
gerencianet
  .updateParcel({
    carnet_id: 233,
    parcel: 1,
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
