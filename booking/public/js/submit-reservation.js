const reservationForm = document.querySelector("#reservationForm");

reservationForm.addEventListener("submit", async (e) => {
  console.log("submitting reservation");
  e.preventDefault();
  const formData = new FormData(reservationForm);
  const reservation = {
    first_name: formData.get("fname"),
    last_name: formData.get("lname"),
    email: formData.get("email"),
    phone_number: formData.get("phone_number"),
    number_of_guests: formData.get("number_of_guests"),
    date: formData.get("date"),
  };
  try {
    const res = await fetch(
      "http://127.0.0.1:8090/api/collections/reservations_requests/records",
      {
        method: "POST",
        body: JSON.stringify(reservation),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (!res.ok) {
      throw res;
    }
    const data = await res.json();
    console.log(data);
    reservationForm.reset();
  } catch (err) {
    const message = await err.text();
    alert(message);
  }
});
