routerAdd("GET", "/dashboard/reservations", (e) => {
  const reservations = e.app.findAllRecords("reservations_requests");

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

routerAdd("POST", "/dashboard/reservations/{id}", (e) => {
  const reservationId = e.request.pathValue("id");
  const reservation = e.app.findRecordById(
    "reservations_requests",
    reservationId
  );

  if (!reservation) {
    return e.json(404, { error: "Reservation not found" });
  }
  reservation.set("status", "accepted");
  e.app.save(reservation);

  return e.redirect(302, "/dashboard/reservations");
});