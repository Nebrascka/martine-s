// Home route
routerAdd("GET", "/", (e) => {
  const html = $template
    .loadFiles(`${__hooks}/views/layout.html`, `${__hooks}/views/booking.html`)
    .render();
  return e.html(200, html);
});

// Load static files
routerAdd(
  "GET",
  "/css/{path...}",
  $apis.static($os.dirFS(`${__hooks}/public/css/`), false)
);
routerAdd(
  "GET",
  "/js/{path...}",
  $apis.static($os.dirFS(`${__hooks}/public/js/`), false)
);
routerAdd(
  "GET",
  "/img/{path...}",
  $apis.static($os.dirFS(`${__hooks}/public/img/`), false)
);

routerAdd("GET", "/dashboard", (e) => {
  const html = $template
    .loadFiles(
      `${__hooks}/views/layout.html`,
      `${__hooks}/views/dashboard.html`
    )
    .render();
  return e.html(200, html);
});
