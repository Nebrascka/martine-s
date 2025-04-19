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
       <h3>Hello ${e.record.get("first_name")} ${e.record.get(
      "last_name"
    )},</h3></br></br>
       <p>Your Reservation was received successfully. We'll stay in touch on the progress.</p></br>
       <p>Thank You.</p>
     `,
    // bcc, cc and custom headers are also supported...
  });

  e.app.newMailClient().send(message);
  console.log(`REQUEST RECEIVED EMAIL Sent to ${e.record.email()}`);
}, "reservations_requests");

onRecordAfterUpdateSuccess((e) => {
  const formatDate = (dateStr) => {
    if (!dateStr) return "Unknown date";
    const date = new Date(dateStr);
    if (isNaN(date.getTime())) return "Invalid date";
    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const dayName = days[date.getDay()];
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${dayName} ${day}-${month}-${year}`;
  };

  if (e.record.get("reservation_status") === "accepted") {
    const dateValue = e.record.get("date");
    const formattedDate = formatDate(dateValue);
    const message = new MailerMessage({
      from: {
        address: e.app.settings().meta.senderAddress,
        name: e.app.settings().meta.senderName,
      },
      to: [{ address: e.record.email() }],
      subject: "Reservation Approved",
      html: `
         Hello ${e.record.get("first_name")} ${e.record.get("last_name")},
         <p>Congratulations!</p></br>
         <p>Your Reservation for ${formattedDate} has been Approved. Thank you for choosing Martine's Bar & Grill.</p></br>
         </br>
         <p>Thank You.</p>
       `,
    });

    e.app.newMailClient().send(message);
    console.log(`APPROVAL EMAIL Sent to ${e.record.email()}`);
  }

  e.next();
}, "reservations_requests");