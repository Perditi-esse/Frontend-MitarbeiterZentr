let transactionIdVordelete;
async function generateKeyVorDelte() {

  const url = 'https://backend-idempotency-provider.greenplant-9a54dc56.germanywestcentral.azurecontainerapps.io/generate-key/';

  const storn = {
    "description": "Buchung_stornieren"
  };
  try {

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(storn)
    });


    if (response.ok) {
      const data = await response.json();
      console.log(data);
      return data;
    } else {
      console.error('Server responded with status:', response.status);
      return null;
    }
  } catch (error) {

    console.error('Error generating key:', error);
    return null;
  }
}

generateKeyVorDelte()
    .then(data => {
      if (data) {
        console.log('Generated key:', data.key);
        transactionIdVordelete = data.key;

      }
    });


function DeleteBooking() {
  const transIdVor = transactionIdVordelete;
  const removeVor = document.getElementById('BuchungIdDelete').value;

  console.log("hat hoffentlich geklappt");
  const apiurl = `https://dsssi-backend-booking.greenplant-9a54dc56.germanywestcentral.azurecontainerapps.io/bookings/${removeVor}/${transIdVor}`
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


let transactionIdVorPay;
async function generateKeyVorPay() {

  const url1 = 'https://backend-idempotency-provider.greenplant-9a54dc56.germanywestcentral.azurecontainerapps.io/generate-key/';

  const pay = {
    "description": "Buchung_bezahlen"
  };
  try {

    const response = await fetch(url1, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(pay)
    });


    if (response.ok) {
      const data = await response.json();
      console.log(data);
      return data;
    } else {
      console.error('Server responded with status:', response.status);
      return null;
    }
  } catch (error) {

    console.error('Error generating key:', error);
    return null;
  }
}

generateKeyVorPay()
    .then(data => {
      if (data) {
        console.log('Generated key:', data.key);
        transactionIdVorPay = data.key;

      }
    });


function PayBooking() {
  const transIdPay = transactionIdVorPay;
  const payBook = document.getElementById('BuchungIdPay').value;

  console.log("hat hoffentlich geklappt");
  const apiURL = "https://dsssi-backend-booking.greenplant-9a54dc56.germanywestcentral.azurecontainerapps.io/bookings/${payBook}/pay/"
  console.log(apiURL);
  openPdf(apiURL);
}
function openPdf(data) {
  var requestOptions = {
    method: 'PUT',
    redirect: 'follow'
  };

  fetch("https://dsssi-backend-booking.greenplant-9a54dc56.germanywestcentral.azurecontainerapps.io/bookings/1/pay", requestOptions)
    .then(response => response.blob()) // Assuming the response is a PDF file
    .then(blob => {
      const url = window.URL.createObjectURL(blob);
      const newTab = window.open(url, '_blank');
      newTab.focus();
    })
    .catch(error => console.log('error', error));

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




