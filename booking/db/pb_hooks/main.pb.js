onRecordCreateRequest((e) => {
  e.next();

  const message = new MailerMessage({
    from: {
      address: e.app.settings().meta.senderAddress,
      name: e.app.settings().meta.senderName,
    },
    to: [{ address: e.record.email() }],
    subject: "Reservation Received",
    html: `
      <h3>Hello</h3></br>
      <p>Your Reservation was received successfully. We'll stay in touch on the progress.</p></br>
      <p>Thank You.</p>
    `,
    // bcc, cc and custom headers are also supported...
  });

  console.log(e.record.email());
  e.app.newMailClient().send(message);
}, "reservations_requests");
