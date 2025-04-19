/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_151168121")

  // update field
  collection.fields.addAt(17, new Field({
    "hidden": false,
    "id": "select2063623452",
    "maxSelect": 1,
    "name": "status",
    "presentable": false,
    "required": true,
    "system": false,
    "type": "select",
    "values": [
      "received",
      "reviewed",
      "accepted",
      "paid",
      "stale"
    ]
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_151168121")

  // update field
  collection.fields.addAt(17, new Field({
    "hidden": false,
    "id": "select2063623452",
    "maxSelect": 1,
    "name": "status",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "select",
    "values": [
      "received",
      "reviewed",
      "accepted",
      "paid",
      "stale"
    ]
  }))

  return app.save(collection)
})
