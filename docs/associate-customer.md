## Associating a customer to a charge

If you create a charge without customers because you didn't know them or was planning to get their info afterwards, no need to panic. You can associate these customers like the following:

Instantiate the module:

```js
var Gerencianet = require('gn-api-sdk-node');
var gerencianet = new Gerencianet(options);
```

```js
var customerInput = {
  charge_id: 223,
  customer: {
    name: 'Gorbadoc Oldbuck',
    email: 'oldbuck@gerencianet.com.br',
    cpf: '04267484171',
    birth: '1977-01-15',
    phone_number: '5144916523'
  }
}

gerencianet
  .associateChargeCustomer(customerInput)
  .then(console.log)
  .catch(console.log);
```

If the customer is a juridical person, it's necessary send the corporate name and CNPJ (brazilian document for juridical person):

```js
var chargeInput = {
  items: [{
    name: 'Product A',
    value: 1000,
    amount: 2
  }],
  customer: {
    name: 'Gorbadoc Oldbuck',
    email: 'oldbuck@gerencianet.com.br',
    cpf: '04267484171',
    birth: '1977-01-15',
    phone_number: '5144916523'
    juridical_person: {
      corporate_name: 'Fictional Company',
      cnpj: '52841284000142'
    }
  }
}
```

If everything went well, the return is just a response with code 200:

```js
{
  "code": 200
}
```
