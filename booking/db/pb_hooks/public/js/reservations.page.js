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
      formatDate(dateStr) {
        if (!dateStr) return "";
        const date = new Date(dateStr);
        if (isNaN(date)) return dateStr;
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
      },
    };
  });
});
