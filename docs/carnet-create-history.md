## Adding information to carnet history

It is possible to add information to the history of a carnet. These informations will be listed when [detailing a carnet](https://github.com/gerencianet/gn-api-sdk-node/tree/master/docs/carnet-detailing.md).

The process to add information to history is shown below:


```js
var Gerencianet = require('gn-api-sdk-node');
var gerencianet = new Gerencianet(options);

var params = {
  id: 1001
}

var body = {
  description: 'Info that will be added to carnet history'
}

gerencianet
  .createCarnetHistory(params, body)
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
