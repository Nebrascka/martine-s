migrate(
  (app) => {
    let superusers = app.findCollectionByNameOrId("_superusers");

    let record = new Record(superusers);

    // note: the values can be eventually loaded via $os.getenv(key)
    // or from a special local config file
    record.set("email", "admin@martinesbarandgrill.co.uk");
    record.set("password", "!Nkipass4");

    app.save(record);
  },
  (app) => {
    // optional revert operation
    try {
      let record = app.findAuthRecordByEmail(
        "_superusers",
        "admin@martinerbarandgrill.co.uk"
      );
      app.delete(record);
    } catch {
      // silent errors (probably already deleted)
    }
  }
);
