### Resending the carnet

To resend the carnet, it must have a `active` status.

If the carnet contemplates this requirement, you just have to provide the carnet id and a email to resend it:

```js
var params = {
  id: 1002
}

var body = {
  email: 'oldbuck@gerencianet.com.br'
}

gerencianet
  .resendCarnet(params, body)
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
