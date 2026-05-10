const form = document.getElementById("bookingForm");

const successMessage =
document.getElementById("successMessage");

const bookingHistory =
document.getElementById("bookingHistory");

const clearHistory =
document.getElementById("clearHistory");

let bookings =
JSON.parse(localStorage.getItem("bookings")) || [];

renderBookings();

/* SUBMIT */
form.addEventListener("submit", function(e){

  e.preventDefault();

  const guestCount =
parseInt(document.getElementById("guests").value);

let paket = "";

if(guestCount === 1){

  paket = "Paket Wanci (1 orang)";

}else if(guestCount === 2){

  paket = "Paket Sapasang (2 orang)";

}else if(guestCount >= 3 && guestCount <= 10){

  paket = "Paket Serumpun (Family 3-10 orang)";

}else if(guestCount > 10){

  paket = "Paket Kenduri (Grup >10 orang)";

}

const booking = {

  name:
  document.getElementById("name").value,

  phone:
  document.getElementById("phone").value,

  date:
  document.getElementById("date").value,

  time:
  document.getElementById("time").value,

  guests:
  guestCount + " People",

  paket:
  paket,

  notes:
  document.getElementById("notes").value

};

  bookings.unshift(booking);

  localStorage.setItem(
    "bookings",
    JSON.stringify(bookings)
  );

  renderBookings();

  successMessage.style.display = "block";

  form.reset();

  setTimeout(() => {

    successMessage.style.display = "none";

  },3000);

});

/* RENDER HISTORY */
function renderBookings(){

  if(bookings.length === 0){

    bookingHistory.innerHTML = `
      <p class="empty-message">
        No booking history yet.
      </p>
    `;

    return;
  }

  bookingHistory.innerHTML = "";

  bookings.forEach((booking) => {

  let paket = booking.paket;

  if(!paket){

    const jumlah =
    parseInt(booking.guests);

    if(jumlah === 1){

      paket = "Paket Wanci (1 orang)";

    }else if(jumlah === 2){

      paket = "Paket Sapasang (2 orang)";

    }else if(jumlah >= 3 && jumlah <= 10){

      paket = "Paket Serumpun (Family 3-10 orang)";

    }else if(jumlah > 10){

      paket = "Paket Kenduri (Grup >10 orang)";
    }

  }

    bookingHistory.innerHTML += `

      <div class="history-card">

        <h3>${booking.name}</h3>

        <p>
          <strong>Phone:</strong>
          ${booking.phone}
        </p>

        <p>
          <strong>Date:</strong>
          ${booking.date}
        </p>

        <p>
          <strong>Time:</strong>
          ${booking.time}
        </p>

        <p>
          <strong>Guests:</strong>
          ${booking.guests}
        </p>

        <p>
          <strong>Package:</strong>
          ${paket}
        </p>

        <p>
          <strong>Notes:</strong>
          ${booking.notes}
        </p>

      </div>

    `;

  });

}

/* CLEAR HISTORY */
clearHistory.addEventListener("click", () => {

  bookings = [];

  localStorage.removeItem("bookings");

  renderBookings();

});

/* INTERACTIVE EFFECT */
document.addEventListener("mousemove", (e) => {

  const card =
  document.querySelector(".booking-form");

  let x =
  (window.innerWidth / 2 - e.pageX) / 40;

  let y =
  (window.innerHeight / 2 - e.pageY) / 40;

  card.style.transform =
  `rotateY(${x}deg) rotateX(${-y}deg)`;

});
