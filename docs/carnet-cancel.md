### Canceling the carnet

Only `active` carnets can be canceled:

```js
var params = {
  id: 18
}

gerencianet
  .cancelCarnet(params)
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
