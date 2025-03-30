/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_3142635823")

  // update collection data
  unmarshal({
    "mfa": {
      "enabled": true
    },
    "otp": {
      "duration": 86400,
      "enabled": true
    }
  }, collection)

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_3142635823")

  // update collection data
  unmarshal({
    "mfa": {
      "enabled": false
    },
    "otp": {
      "duration": 180,
      "enabled": false
    }
  }, collection)

  return app.save(collection)
})
