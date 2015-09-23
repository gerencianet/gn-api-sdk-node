## Notifications

Instantiate the module:

```js
var Gerencianet = require('gn-api-sdk-node');
var gerencianet = new Gerencianet(options);
```

Any changes that happen in the charges will trigger an event that notifies the `notification_url` provided at creation time (see [creating charges](https://github.com/gerencianet/gn-api-sdk-node/tree/master/docs/charges.md)).

It's also possible to set or change the `notification_url` for existing charges, see [updating informations](https://github.com/gerencianet/gn-api-sdk-node/tree/master/docs/charge-update.md).

Given that a charge has a valid `notification_url`, when the notification time comes you'll receive a post with a `token`. This token must be used to get the notification payload data.

The example below assumes that you're using *express js* with *body-parser*, so that you get post params parsed inside `req.body`. It's easier showing than explaining with words:

```js
app.post('/notifications', function(req, res) {
  params = {
    token: req.body.notification
  }

  gerencianet
    .getNotification(params)
    .then(console.log)
    .catch(console.log)
    .done();
});
```

Response:

```js
{
  "code": 200,
  "data": [{
    "id": 1,
    "type": "charge",
    "custom_id": null,
    "status": {
      "current": "new",
      "previous": null
    },
    "identifiers": {
      "charge_id": 1002
    }
  }, {
    "id": 2,
    "type": "charge",
    "custom_id": null,
    "status": {
      "current": "waiting",
      "previous": "new"
    },
    "identifiers": {
      "charge_id": 1002
    }
  }, {
    "id": 3,
    "type": "charge",
    "custom_id": null,
    "status": {
      "current": "paid",
      "previous": "waiting"
    },
    "identifiers": {
      "charge_id": 1002
    },
    "value": 2000
  }, {
    "id": 4,
    "type": "charge",
    "custom_id": null,
    "status": {
      "current": "refunded",
      "previous": "paid"
    },
    "identifiers": {
      "charge_id": 1002
    }
  }]
}
```

Response will be an array with all changes of a token that happened within 6 months, and it contains the following parameters:

* id: Each notification has its own sequence, starting from `1` and the `id` parameter is used to mark this sequence. This is useful if you need to keep track which change you have already processed.

* type: The type of this change. The available values are:
  * `charge` - a charge have changed.
  * `subscription` - a subscription have changed.
  * `carnet` - a carnet have changed.
  * `subscription_charge` - one subscription's parcel have changed.
  * `carnet_charge` - one carnet's parcel have changed.


* custom_id: Your custom_id.

* status: Status of the transaction. It contains the `current` status and `previous` status (before the change) of this transaction.

 p.s.: if there is no `previous` status (i.e.: for new charges), the `previous` value will be null.

* identifiers: Identifiers related to this change. It may have one or more identifier depending on the type:
  * for `charge` type: identifiers will contain only `charge_id`.
  * for `subscription` type: identifiers will contain only `subscription_id`.
  * for `carnet` type: identifiers will contain only `carnet_id`.
  * for `subscription_charge` type: identifiers will contain both `charge_id` and `subscription_id`.
  * for `carnet_charge` type: identifiers will contain both `charge_id` and `carnet_id`.


* value: this parameter will only be shown when the change is about paid charges.

 For more informations about notifications, please, refer to [Gerencianet](https://docs.gerencianet.com.br/#!/charges/notifications).
