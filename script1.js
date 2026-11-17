var selectedSeat = "";
var bookedSeat = "";

// Function to switch between tabs
function showTab(tabName) {
  document.getElementById("tab-venues").style.display = "none";
  document.getElementById("tab-map").style.display = "none";
  document.getElementById("tab-passes").style.display = "none";

  document.getElementById("btn-venues").className = "";
  document.getElementById("btn-map").className = "";
  document.getElementById("btn-passes").className = "";

  document.getElementById("tab-" + tabName).style.display = "block";
  document.getElementById("btn-" + tabName).className = "active-btn";
}

// Function to search study zone cards
function filterZones() {
  var input = document.getElementById("searchInput").value.toLowerCase();
  var cards = document.getElementsByClassName("zone-card");

  for (var i = 0; i < cards.length; i++) {
    var cardText = cards[i].innerText.toLowerCase();
    if (cardText.includes(input)) {
      cards[i].style.display = "block";
    } else {
      cards[i].style.display = "none";
    }
  }
}

// Function to clear search bar
function resetSearch() {
  document.getElementById("searchInput").value = "";
  filterZones();
}

// Open desk map from zone card button
function openZoneMap(zoneTitle) {
  document.getElementById("currentZoneHeading").innerText = zoneTitle;
  document.getElementById("zoneDropdown").value = zoneTitle;
  showTab("map");
}

// Change zone heading from dropdown
function changeZoneHeading() {
  var selectedZone = document.getElementById("zoneDropdown").value;
  document.getElementById("currentZoneHeading").innerText = selectedZone;
}

// Select an available desk
function chooseDesk(deskCode, status) {
  if (status === "occupied" || deskCode === bookedSeat) {
    alert("Desk " + deskCode + " is already occupied. Please select a green desk.");
    return;
  }

  selectedSeat = deskCode;
  document.getElementById("displayDeskCode").innerText = deskCode;
  document.getElementById("displayDeskStatus").innerText = "Available";
  document.getElementById("displayDeskStatus").style.color = "green";

  var btn = document.getElementById("bookNowBtn");
  btn.disabled = false;
  btn.innerText = "Reserve Desk " + deskCode;
  btn.className = "active-reserve-btn";
}

// Open booking popup
function openBookingPopup() {
  if (selectedSeat === "") {
    alert("Please select an available desk first.");
    return;
  }
  document.getElementById("popupDeskLabel").innerText = selectedSeat;
  document.getElementById("bookingPopup").style.display = "flex";
}

// Close booking popup
function closeBookingPopup() {
  document.getElementById("bookingPopup").style.display = "none";
}

// Confirm desk booking
function confirmBooking() {
  var name = document.getElementById("inputName").value;
  var regNo = document.getElementById("inputReg").value;
  var duration = document.getElementById("inputDuration").value;
  var zone = document.getElementById("currentZoneHeading").innerText;

  if (name === "" || regNo === "") {
    alert("Please enter both your Name and Registration Number.");
    return;
  }

  if (regNo.length !== 8) {
    alert("Please enter an 8-digit LPU Registration Number.");
    return;
  }

  // Change desk color to orange (booked)
  bookedSeat = selectedSeat;
  var deskButton = document.getElementById("desk-" + bookedSeat);
  deskButton.className = "desk booked";
  deskButton.innerHTML = bookedSeat + "<br><small>Booked</small>";

  // Show details in My Pass tab
  document.getElementById("passZoneName").innerText = zone;
  document.getElementById("passDeskCode").innerText = bookedSeat;
  document.getElementById("passStudentName").innerText = name;
  document.getElementById("passStudentReg").innerText = regNo;
  document.getElementById("passDuration").innerText = duration;

  document.getElementById("noPassMessage").style.display = "none";
  document.getElementById("activePassCard").style.display = "block";

  // Update counters
  document.getElementById("navActiveDesk").innerText = bookedSeat;
  document.getElementById("userBookingCount").innerText = "1";
  document.getElementById("freeDesksCount").innerText = "67";

  // Reset reserve button
  selectedSeat = "";
  var btn = document.getElementById("bookNowBtn");
  btn.disabled = true;
  btn.innerText = "Click a Green Desk First";
  btn.className = "disabled-btn";

  closeBookingPopup();
  alert("Success! Desk " + bookedSeat + " has been reserved.");
  showTab("passes");
}

// Cancel booking and free the desk
function cancelBooking() {
  if (bookedSeat !== "") {
    var deskButton = document.getElementById("desk-" + bookedSeat);
    deskButton.className = "desk free";
    deskButton.innerHTML = bookedSeat + "<br><small>Free</small>";
  }

  bookedSeat = "";
  document.getElementById("noPassMessage").style.display = "block";
  document.getElementById("activePassCard").style.display = "none";

  document.getElementById("navActiveDesk").innerText = "None";
  document.getElementById("userBookingCount").innerText = "0";
  document.getElementById("freeDesksCount").innerText = "68";

  alert("Your reservation has been cancelled and the desk is now free.");
