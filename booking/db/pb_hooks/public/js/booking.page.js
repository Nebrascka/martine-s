// /public/js/alpine-app.js
document.addEventListener("alpine:init", () => {
  Alpine.data("reservationPage", () => ({
    // User Information
    first_name: "",
    last_name: "",
    email: "",
    phone_number: "",

    // Event Information
    event: "",
    date: "",
    event_description: "",

    // Guest Information
    adults: 1,
    hasChildren: false,
    children: 1,

    // Additional Information
    hasAllergy: false,
    allergy_description: "",
    hasDisability: false,
    disability_description: "",
    special_instructions: "",

    // Form state
    loading: false,
    success: false,
    error: null,

    // Validation states
    firstNameValid: false,
    lastNameValid: false,
    emailValid: false,
    phoneValid: true, // Optional field
    eventNameValid: false,
    dateValid: false,

    // today
    today: null,

    // form pages
    formPages: [
      {
        id: 0,
        full: false,
      },
      {
        id: 1,
        full: false,
      },
      {
        id: 2,
        full: false,
      },
      {
        id: 3,
        full: false,
      },
      {
        id: 4,
        full: false,
      },
    ],

    activeFormPage: {
      id: 0,
      full: false,
    },

    goBack(page) {
      const pageIndex = page.id - 1 < 0 ? 0 : page.id - 1;
      this.activeFormPage = this.formPages[pageIndex];
    },

    goNext(page) {
      // Check if the current form page is full
      const isCurrentPageFull = this.checkFormPageFull(page.id);
      if (isCurrentPageFull) {
        this.formPages[page.id].full = true;
        const pageIndex =
          page.id + 1 > this.formPages.length - 1 ? page.id : page.id + 1;
        this.activeFormPage = this.formPages[pageIndex];
      }
    },

    checkFormPageFull(pageId) {
      // Add logic to check if all inputs in the current form page are filled
      switch (pageId) {
        case 0:
          return (
            this.firstNameValid &&
            this.lastNameValid &&
            this.emailValid &&
            this.phoneValid
          );
        case 1:
          return this.eventNameValid && this.dateValid;
        case 2:
          return this.adults > 0 && (!this.hasChildren || this.children >= 0);
        case 3:
          return true; // Additional information is optional
        case 4:
          return true; // Special instructions are optional
        default:
          return false;
      }
    },

    isLastPage() {
      return this.activeFormPage.id === this.formPages.length - 1;
    },
    // Toggle navigation/modal
    open: false,
    toggleOpen() {
      this.open = !this.open;
    },

    // Validation methods
    validateName(name) {
      return /^[A-Za-z]{2,50}$/.test(name);
    },

    validateEmail(email) {
      return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
    },

    validatePhone(phone) {
      return (
        phone === "" ||
        /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(phone)
      );
    },

    validateEventName(name) {
      return /^[A-Za-z0-9\s\-',]{2,100}$/.test(name);
    },

    validateDate(date) {
      return date !== "";
    },

    // Form reset
    resetForm() {
      this.first_name = "";
      this.last_name = "";
      this.email = "";
      this.phone_number = "";
      this.event = "";
      this.date = "";
      this.event_description = "";
      this.adults = 1;
      this.hasChildren = false;
      this.children = 1;
      this.hasAllergy = false;
      this.allergy_description = "";
      this.hasDisability = false;
      this.disability_description = "";
      this.special_instructions = "";

      this.firstNameValid = false;
      this.lastNameValid = false;
      this.emailValid = false;
      this.phoneValid = true;
      this.eventNameValid = false;
      this.dateValid = false;

      this.success = false;
      this.error = null;
    },

    // Form submission handler
    async submitForm() {
      // Validate all fields
      this.firstNameValid = this.validateName(this.first_name);
      this.lastNameValid = this.validateName(this.last_name);
      this.emailValid = this.validateEmail(this.email);
      this.phoneValid = this.validatePhone(this.phone_number);
      this.eventNameValid = this.validateEventName(this.event);
      this.dateValid = this.validateDate(this.date);

      if (
        this.firstNameValid &&
        this.lastNameValid &&
        this.emailValid &&
        this.phoneValid &&
        this.eventNameValid &&
        this.dateValid
      ) {
        try {
          this.loading = true;
          this.error = null;

          const reservation = {
            first_name: this.first_name,
            last_name: this.last_name,
            email: this.email,
            phone_number: this.phone_number,
            event: this.event,
            date: this.date,
            event_description: this.event_description,
            adults: this.adults,
            hasChildren: this.hasChildren,
            children: this.hasChildren ? this.children : 0,
            hasAllergy: this.hasAllergy,
            allergy_description: this.hasAllergy
              ? this.allergy_description
              : "",
            hasDisability: this.hasDisability,
            disability_description: this.hasDisability
              ? this.disability_description
              : "",
            special_instructions: this.special_instructions,
          };

          const res = await fetch(
            "/api/collections/reservations_requests/records",
            {
              method: "POST",
              body: JSON.stringify(reservation),
              headers: {
                "Content-Type": "application/json",
              },
            }
          );

          if (!res.ok) {
            const errorData = await res.json();
            throw new Error(
              errorData.message || "Failed to submit reservation"
            );
          }

          const data = await res.json();

          // Show success message
          this.success = true;

          // Reset form after 5 seconds
          setTimeout(() => {
            this.resetForm();
          }, 5000);
        } catch (err) {
          console.error("Error submitting reservation:", err);
          this.error =
            err.message ||
            "An error occurred while submitting your reservation";
        } finally {
          this.loading = false;
        }
      }
    },

    // Any initialization logic
    init() {
      // Set minimum date to today
      const today = new Date();
      const year = today.getFullYear();
      const month = String(today.getMonth() + 1).padStart(2, "0");
      const day = String(today.getDate()).padStart(2, "0");
      this.date = `${year}-${month}-${day}`;
      this.dateValid = this.validateDate(this.date);

      // Set minimum date attribute on date input
      const dateInput = document.getElementById("eventDate");
      if (dateInput) {
        dateInput.min = `${year}-${month}-${day}`;
      }

      // Load any saved form data from localStorage
      const savedData = localStorage.getItem("reservationFormData");
      if (savedData) {
        try {
          const data = JSON.parse(savedData);

          // Only restore non-sensitive fields
          this.event = data.event || "";
          this.event_description = data.event_description || "";
          this.adults = data.adults || 1;
          this.hasChildren = data.hasChildren || false;
          this.children = data.children || 1;
          this.hasAllergy = data.hasAllergy || false;
          this.hasDisability = data.hasDisability || false;
          this.special_instructions = data.special_instructions || "";

          // Validate restored fields
          if (this.event)
            this.eventNameValid = this.validateEventName(this.event);
        } catch (e) {
          console.error("Error restoring saved form data:", e);
          localStorage.removeItem("reservationFormData");
        }
      }
    },

    // Save form data periodically
    saveFormData() {
      // Only save non-sensitive data
      const dataToSave = {
        event: this.event,
        event_description: this.event_description,
        adults: this.adults,
        hasChildren: this.hasChildren,
        children: this.children,
        hasAllergy: this.hasAllergy,
        hasDisability: this.hasDisability,
        special_instructions: this.special_instructions,
      };
      localStorage.setItem("reservationFormData", JSON.stringify(dataToSave));
    },
  }));
});
