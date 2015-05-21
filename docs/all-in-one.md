## Create charge, customer, payment

The most common case scenarios will consist of the three steps mentioned in the title. The other examples show each part separately. Here goes the most used endpoints together in one example.

At this point you should've noticed that this sdk works with promises, so that you can concat calls one after another using the `then` method.

Create the inputs for the three endpoints:

```js
var chargeInput = {
  items: [{
    name: 'Product 1',
    value: 1000,
    amount: 2
  }],
  shippings: [{
    name: 'Default Shipping Cost',
    value: 100
  }, {
    name: 'Adicional Shipping Cost',
    value: 150
  }]
}

var customerInput = {
  charge_id: 223,
  name: 'Gorbadoc Oldbuck',
  email: 'oldbuck@gerencianet.com.br',
  document: '04267484171',
  birth: '1977-01-15',
  phone_number: '5044916523'
}

var paymentInput = {
  charge_id: 223,
  payment: {
    credit_card: {
      installments: 1,
      payment_token: 'fec500b1f3eb16615ca61f7c4781f51dcde49131',
      billing_address: {
        street: 'Street 3',
        number: 10,
        neighborhood: 'Bauxita',
        zipcode: '35400000',
        city: 'Ouro Preto',
        state: 'MG'
      }
    }
  }
}
```

Create the callback functions for charge and customer:

```js
var createCustomer = function (response) {
  console.log(response);
  if (response.code === 200) {
    customerInput.charge_id = response.charge.id;
    paymentInput.charge_id = response.charge.id;
    return gerencianet.createCustomer(customerInput);
  } else {
    throw new Error();
  }
}

var createPayment = function (response) {
  console.log(response);
  if (response.code === 200) {
    return gerencianet.createPayment(paymentInput)
  } else {
    throw new Error();
  }
}
```

Call the endpoints:

```js
var gerencianet = new Gerencianet(options);

gerencianet
  .createCharge(chargeInput)
  .then(createCustomer)
  .then(createPayment)
  .then(console.log)
  .catch(console.log);
```

Response:

```js
{ "code": 200,
  "charge": {
     "id": 260,
     "total": 2250,
     "status": 'new',
     "custom_id": null,
     "created_at": "2015-05-18"
   }
} //charge created

{ "code": 200 } //customer created

{ "code": 200,
  "response": {
     "transaction": 143,
     "total": 2400,
     "payment": "credit_card",
     "installments": 1,
     "installment_value": 2400
  }
} //payment created
```


If we embbed the `customerInput` inside `chargeInput`, we can skip the second step and go straight to payment:

```js
var chargeInput = {
  items: [{
    name: 'Product 1',
    value: 1000,
    amount: 2
  }],
  shippings: [{
    name: 'Default Shipping Cost',
    value: 100
  }, {
    name: 'Adicional Shipping Cost',
    value: 150
  }],
  customer: customerInput
}

gerencianet
  .createCharge(chargeInput)
  .then(createPayment)
  .then(console.log)
  .catch(console.log);
```

Response:

```js
{ "code": 200,
  "charge": {
     "id": 260,
     "total": 2250,
     "status": 'new',
     "custom_id": null,
     "created_at": "2015-05-18"
   }
} //charge created

{ "code": 200,
  "response": {
     "transaction": 143,
     "total": 2400,
     "payment": "credit_card",
     "installments": 1,
     "installment_value": 2400
  }
} //payment created
```
