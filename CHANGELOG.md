# 0.0.11

- Refactored: gn-auth - client credentials are now sent within the header
- Refactored: gn-constants/gn-endpoints/gn-sdk - each function now has two arguments: *params* and *body*.
              The *body* is meant to be sent in the request body as usual, whereas the *params* will be mapped to                url params as defined in gn-constants. If the param is not present in the url, it will be sent as a                query string
- Refactored: gn-endpoints - now Gerencianet endpoints are restfull, which means that the sdk must consider sending               also put and delete
- Updated: docs

# 0.0.10

- Updated: gn-constants - added new endpoints
- Refactored: gn-sdk - loop through gn-constants endpoints and create the prototype functions
- Updated: docs

# 0.0.9

- Updated: gn-sdk - added createPlan

# 0.0.8

- Updated: docs
- Updated: getPaymentMethods endpoint now is getPaymentData

# 0.0.7

- Updated: node modules dependencies

# 0.0.6

- Fixed: nock net connection issues

# 0.0.5

- Changed: Gerenciant's urls for production and sandbox
- Added: new endpoints (subscriptions, notifications)

# 0.0.1

- Initial release
