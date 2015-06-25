## Associating customers to existing charges

Instantiate the module:

```js
var Gerencianet = require('gn-api-sdk-node');
var gerencianet = new Gerencianet(options);
```

If you created charges without customers because you didn't know them or was planning to get their info afterwards, no need to panic. You can associate these customers to their respective charges like the following:

```js
var customerInput = {
  charge_id: 223,
  customer: {
    name: 'Gorbadoc Oldbuck',
    email: 'oldbuck@gerencianet.com.br',
    document: '04267484171',
    birth: '1977-01-15',
    phone_number: '5144916523'
  }
}


gerencianet
  .createCustomer(customerInput)
  .then(console.log)
  .catch(console.log);
```

If everything went well, the return is just a response with code 200:

```js
{
  "code": 200
}
```
