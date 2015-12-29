### Resending carnet parcel

To resend the carnet parcel, the parcel must have a `waiting` status.

If the parcel contemplates this requirement, you just have to provide the carnet id, the parcel number and a email to resend it:

```js
var params = {
  id: 1002,
  parcel: 1
}

var body = {
  email: 'oldbuck@gerencianet.com.br'
}

gerencianet
  .resendParcel(params, body)
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
