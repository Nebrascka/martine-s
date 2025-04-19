document.addEventListener("alpine:init", () => {
  Alpine.data("reservationsPage", (reservationsJson) => {
    let reservations;
    try {
      reservations = Array.isArray(reservationsJson)
        ? reservationsJson
        : JSON.parse(reservationsJson);
    } catch {
      reservations = [];
    }
    return {
      reservations: reservations,
      selectedReservation: null,
      modalOpen: false,

      openDialog(reservation) {
        this.selectedReservation = reservation;
        this.modalOpen = true;
      },
      closeDialog() {
        this.modalOpen = false;
        this.selectedReservation = null;
      },
      acceptReservation(reservation) {
        // Implement your accept logic here (e.g., send API request)
        alert(
          "Reservation accepted for: " +
            reservation.first_name +
            " " +
            reservation.last_name
        );
        this.closeDialog();
      },
    };
  });
});
