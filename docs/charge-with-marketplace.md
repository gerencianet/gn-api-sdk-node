## Creating charges with marketplace

What if your web store contains products from many different sellers from many different segments? The user can complete a single purchase with products from more than one seller, right? Here enters marketplace.

With some extra attributes, you can tell Gerencianet to pass on a percentage amount of the purchase total value to someone else.

Instantiate the module:

```js
var Gerencianet = require('gn-api-sdk-node');
var gerencianet = new Gerencianet(options);
```

Create the charge object including a marketplace object:

```js
var chargeInput = {
  items: [{
    name: 'Product A',
    value: 1000,
    amount: 1,
    marketplace: {
        repasses: [{
          payee_code: "GEZTAMJYHA3DAMBQGAYDAMRYGMZTGM",
          percentage: 2500
        },{
          payee_code: "AKSLJI3DAMBQGSKLJDYDAMRTGOPWKS",
          percentage: 2500
        }]
      }
  }],
  metadata: {
    notification_url: 'http://google.com'
  }
}
```

Create the charge:

```js
gerencianet
  .createCharge(chargeInput)
  .then(console.log)
  .catch(console.log);
```

The attribute `payee_code` identifies a Gerencianet account, just like in [creating charges with shippings](https://github.com/franciscotfmc/gn-api-sdk-node/tree/master/docs/charge-with-shippings.md). In order to get someone else's `payee_code` you need to ask the account owner. There is no other way. To visualize yours, log in your Gerencianet account and search for *Identificador de Conta* under *Dados Cadastrais*.

In the example above, there are two repasses, both of 25%, but each one for a different account, whereas the `payee_code` differs. The integrator account will receive, at the end, 50% of the total value. Disregarding the rates, the integrator account would receive R$5,00. The other two accounts would receive R$ 2,50 each.

The response is the sames as usual:

```js
{
  "code": 200,
  "data": {
    "charge_id": 254,
    "total": 10000,
    "status": "new",
    "custom_id": null,
    "created_at": "2015-05-18"
  }
}
```
