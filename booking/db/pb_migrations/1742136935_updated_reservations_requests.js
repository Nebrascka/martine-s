/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_151168121")

  // add field
  collection.fields.addAt(9, new Field({
    "autogeneratePattern": "",
    "hidden": false,
    "id": "text1001261735",
    "max": 0,
    "min": 0,
    "name": "event",
    "pattern": "",
    "presentable": false,
    "primaryKey": false,
    "required": false,
    "system": false,
    "type": "text"
  }))

  // add field
  collection.fields.addAt(10, new Field({
    "autogeneratePattern": "",
    "hidden": false,
    "id": "text3329069990",
    "max": 0,
    "min": 0,
    "name": "event_description",
    "pattern": "",
    "presentable": false,
    "primaryKey": false,
    "required": false,
    "system": false,
    "type": "text"
  }))

  // add field
  collection.fields.addAt(11, new Field({
    "hidden": false,
    "id": "bool3508374321",
    "name": "hasAllergy",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "bool"
  }))

  // add field
  collection.fields.addAt(12, new Field({
    "autogeneratePattern": "",
    "hidden": false,
    "id": "text177602960",
    "max": 0,
    "min": 0,
    "name": "allergy_description",
    "pattern": "",
    "presentable": false,
    "primaryKey": false,
    "required": false,
    "system": false,
    "type": "text"
  }))

  // add field
  collection.fields.addAt(13, new Field({
    "convertURLs": false,
    "hidden": false,
    "id": "editor1102786338",
    "maxSize": 0,
    "name": "special_instructions",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "editor"
  }))

  // add field
  collection.fields.addAt(14, new Field({
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
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_151168121")

  // remove field
  collection.fields.removeById("text1001261735")

  // remove field
  collection.fields.removeById("text3329069990")

  // remove field
  collection.fields.removeById("bool3508374321")

  // remove field
  collection.fields.removeById("text177602960")

  // remove field
  collection.fields.removeById("editor1102786338")

  // remove field
  collection.fields.removeById("select2063623452")

  return app.save(collection)
})
