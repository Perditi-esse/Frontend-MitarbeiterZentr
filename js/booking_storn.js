function DeleteBooking() {
  const removeVor = document.getElementById('BuchungIdDelete').value;

  console.log("hat hoffentlich geklappt");
  const apiurl = `https://dsssi-backend-booking.greenplant-9a54dc56.germanywestcentral.azurecontainerapps.io/bookings/${removeVor}/`
  console.log(apiurl);
  sendAPIRequest(apiurl);
}
function sendAPIRequest(data) {
  var raw = "";
  var requestOptions = {
    method: 'DELETE',
    body: 'raw',
    redirect: 'follow'
  };

  fetch(data, requestOptions)
    .then(response => response.text())
    .then(result => console.log(result))
    .catch(error => console.log('Fehler:', error));

}

// Hinzufügen eines Klick-Ereignislisteners zum Button
document.getElementById("bookingStornButton").addEventListener("click", DeleteBooking);

function PayBooking() {
  const payBook = document.getElementById('BuchungIdPay').value;

  console.log("hat hoffentlich geklappt");
  const apiURL = `https://dsssi-backend-booking.greenplant-9a54dc56.germanywestcentral.azurecontainerapps.io/bookings/${payBook}/pay/`
  console.log(apiURL);
  openPdf(apiURL);
}
function openPdf(data) {

  fetch(data, {
    method: 'PUT'
  })
    .then(response => response.blob())
    .then(data => {
      const blobUrl = URL.createObjectURL(data);

      // Öffne ein neues Tab mit der PDF-Datei
      const newTab = window.open(blobUrl, '_blank');

      // Stelle sicher, dass das neue Tab fertig geladen ist, bevor es geschlossen wird
      newTab.onload = function () {
        URL.revokeObjectURL(blobUrl);
      };
    })
    .catch(error => console.error('Fehler beim Abrufen der PDF:', error));
}



// Hinzufügen eines Klick-Ereignislisteners zum Button
document.getElementById("bookingPayButton").addEventListener("click", PayBooking);

const abmeldenButton = document.getElementById("abmelden-button");

abmeldenButton.addEventListener("click", function () {
  // Hier die URL der Zielseite einfügen, zu der Sie weiterleiten möchten
  // Ändern Sie dies entsprechend Ihrer Zielseite
  // Weiterleitung zur Zielseite
  window.location.href = "main.html";
});

var bild = document.getElementById("dsssi-logo");

// Füge einen Klick-Eventlistener hinzu
bild.addEventListener("click", function() {
  // Leite den Benutzer zur gewünschten Webseite weiter
  window.location.href = "main.html";
});


document.addEventListener('DOMContentLoaded', function () {
  // Hier können Sie den API-Aufruf durchführen, wenn der Button geklickt wird
  fetch('https://dsssi-backend-booking.greenplant-9a54dc56.germanywestcentral.azurecontainerapps.io/bookings/all')
    .then(response => response.text()) // Ändern Sie .json() auf .text(), da die API eine Textantwort sendet
    .then(data => {
      // Hier können Sie die Ergebnisse in Ihrer HTML-Oberfläche anzeigen
      const resultsDiv = document.getElementById('results');
      resultsDiv.innerHTML = data; // Zeigen Sie den API-Text in #results an
      console.log(data); // Gib den API-Text in der Konsole aus
      processBookings(data)
    })
    .catch(error => console.error('Fehler bei der API-Anfrage:', error));
});
function processBookings(apiText) {
  //const text = `[{"id":1,"show_id":1,"customer_id":1,"seats":"A1,A2","amount":100,"is_paid":true,"is_used":false,"datetime":"2023-09-21T13:30:00"},{"id":2,"show_id":1,"customer_id":1,"seats":"A1,A2","amount":100,"is_paid":true,"is_used":false,"datetime":"2023-09-21T13:31:25"},{"id":3,"show_id":1,"customer_id":1,"seats":"A1,A2","amount":100,"is_paid":true,"is_used":false,"datetime":"2023-09-21T13:32:52"},{"id":4,"show_id":1,"customer_id":1,"seats":"A1,A2","amount":100,"is_paid":true,"is_used":false,"datetime":"2023-09-21T13:34:01"},{"id":5,"show_id":1,"customer_id":1,"seats":"A1,A2","amount":100,"is_paid":true,"is_used":false,"datetime":"2023-09-21T13:35:02"},{"id":6,"show_id":1,"customer_id":1,"seats":"A1,A2","amount":100,"is_paid":false,"is_used":false,"datetime":"2023-09-21T13:35:16"},{"id":7,"show_id":1,"customer_id":1,"seats":"A1,A2","amount":100,"is_paid":true,"is_used":false,"datetime":"2023-09-21T13:36:44"},{"id":8,"show_id":1,"customer_id":1,"seats":"A1,A2","amount":100,"is_paid":true,"is_used":false,"datetime":"2023-09-21T13:37:49"},{"id":9,"show_id":1,"customer_id":1,"seats":"A1,A2","amount":100,"is_paid":true,"is_used":false,"datetime":"2023-09-21T13:37:59"},{"id":10,"show_id":1,"customer_id":1,"seats":"A1,A2","amount":100,"is_paid":true,"is_used":false,"datetime":"2023-09-21T13:40:12"},{"id":11,"show_id":1,"customer_id":1,"seats":"A1,A2","amount":100,"is_paid":true,"is_used":false,"datetime":"2023-09-21T13:45:48"},{"id":12,"show_id":1,"customer_id":1,"seats":"A1,A2","amount":100,"is_paid":true,"is_used":false,"datetime":"2023-09-21T13:50:05"},{"id":13,"show_id":1,"customer_id":1,"seats":"A1,A2","amount":100,"is_paid":false,"is_used":false,"datetime":"2023-09-21T13:52:50"},{"id":14,"show_id":1,"customer_id":1,"seats":"A1,A2","amount":100,"is_paid":false,"is_used":false,"datetime":"2023-09-21T13:54:32"},{"id":15,"show_id":1,"customer_id":1,"seats":"A1,A2","amount":100,"is_paid":false,"is_used":false,"datetime":"2023-09-21T13:54:55"},{"id":16,"show_id":1,"customer_id":1,"seats":"A1,A2","amount":100,"is_paid":true,"is_used":false,"datetime":"2023-09-21T13:56:14"},{"id":17,"show_id":1,"customer_id":1,"seats":"A1,A2","amount":100,"is_paid":false,"is_used":false,"datetime":"2023-09-21T13:57:28"},{"id":18,"show_id":1,"customer_id":1,"seats":"A1,A2","amount":100,"is_paid":false,"is_used":false,"datetime":"2023-09-21T21:37:25"},{"id":19,"show_id":1,"customer_id":1,"seats":"A1,A2","amount":100,"is_paid":false,"is_used":false,"datetime":"2023-09-21T21:45:08"},{"id":20,"show_id":1,"customer_id":1,"seats":"A1,A2,A3","amount":300,"is_paid":false,"is_used":false,"datetime":"2023-10-13T16:27:49"},{"id":22,"show_id":2,"customer_id":3,"seats":"4","amount":50,"is_paid":true,"is_used":true,"datetime":"2023-10-13T16:34:20"},{"id":23,"show_id":2,"customer_id":3,"seats":"4","amount":50,"is_paid":false,"is_used":false,"datetime":"2023-10-13T16:34:21"},{"id":24,"show_id":2,"customer_id":3,"seats":"4","amount":50,"is_paid":false,"is_used":false,"datetime":"2023-10-13T16:34:22"}]`;
  const text = apiText;

  const bookings = text.split('},{');

// Referenz zur Tabellen-Element in HTML
  const table = document.getElementById('myTable');

  const headerRow = table.insertRow();

  // Extrahiere die Spaltennamen aus der ersten Buchung
  const firstBooking = JSON.parse('{' + bookings[0].replace('[{', '').replace('}]', '') + '}');
  const columnLabels = {
    "id": "BuchungsID",
    "show_id": "VorstellungsID",
    "customer_id": "KundenID",
    "seats": "gebuchte Sitze",
    "amount": "Summe",
    "is_paid": "bezahlt?",
    "is_used": "benutzt?",
    "datetime": "Buchungsdatum"
  };

  for (const key in firstBooking) {
    const cell = headerRow.insertCell();
    cell.textContent = columnLabels[key];
  }

  for (let i = 0; i < bookings.length; i++) {
    const row = table.insertRow();
    const bookingData = bookings[i].replace('[{', '').replace('}]', '');
    const bookingValues = JSON.parse('{' + bookingData + '}');
    for (const key in bookingValues) {
      const cell = row.insertCell();
      cell.textContent = bookingValues[key];
    }
  }
}




