### Canceling a carnet parcel

To cancel a carnet parcel, it must have status `waiting` or `unpaid`.

```js
var params = {
  id: 18, 
  parcel: 1
}

gerencianet
  .cancelParcel(params)
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
