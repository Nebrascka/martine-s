/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_151168121")

  // add field
  collection.fields.addAt(9, new Field({
    "hidden": false,
    "id": "number2006682320",
    "max": null,
    "min": null,
    "name": "number_of_guests",
    "onlyInt": false,
    "presentable": false,
    "required": false,
    "system": false,
    "type": "number"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_151168121")

  // remove field
  collection.fields.removeById("number2006682320")

  return app.save(collection)
})
