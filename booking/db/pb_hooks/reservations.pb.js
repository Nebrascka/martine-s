routerAdd("GET", "/dashboard/reservations", (e) => {
  const reservations = e.app.findAllRecords("reservations_requests");

  //  console.log(JSON.stringify(reservations));
  const html = $template
    .loadFiles(
      `${__hooks}/views/layout.html`,
      `${__hooks}/views/dashboard.html`,
      `${__hooks}/views/pages/reservations.page.html`
    )
    .render({
      reservations: JSON.stringify(reservations),
    });
  return e.html(200, html);
});
