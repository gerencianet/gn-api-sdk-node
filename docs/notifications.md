## Notifications

Instantiate the module:

```js
var Gerencianet = require('gn-api-sdk-node');
var gerencianet = new Gerencianet(options);
```

Any changes that happen in the charges will trigger an event that notifies the `notification_url` provided at creation time (see [creating charges](https://github.com/franciscotfmc/gn-api-sdk-node/tree/master/docs/charge-with-customer.md)).

It's also possible to set or change the `notification_url` for existing charges:

```js
gerencianet
  .updateNotification({
    charge_id: 233,
    notification_url: 'http://google.com'
  })
  .then(function (notification) {
    console.log(util.inspect(notification, false, null));
  })
  .catch(console.log)
  .done();
```

Response:

```js
{
  "code": 200
}
```

Given that a charge has a valid `notification_url`, when the notification time comes you'll receive a post with a `token`. This token must be used to get the notification payload data.

The example below assumes that you're using *express js* with *body-parser*, so that you get post params parsed inside `req.body`. It's easier showing than explaining with words:

```js
app.post('/notifications', function(req, res) {
  var notificationToken = req.body.notification,

  gerencianet
    .getNotification({
      notification: notificationToken
    })
    .then(function (notification) {
      console.log(util.inspect(notification, false, null));
    })
    .catch(console.log)
    .done();
});
```

Response:

```js
{
  "code": 200,
  "data": {
    "charge_id": 233,
    "subscription_id": 12,
    "total": 2000,
    "status": "new",
    "custom_id": null,
    "created_at": "2015-05-14",
    "history": [
      {
        "status": "new",
        "timestamp": "2015-05-14 15:39:14"
      }
    ]
  }
}
