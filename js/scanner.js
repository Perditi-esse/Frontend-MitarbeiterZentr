// When scan is successful fucntion will produce data
let hasExecuted = false;

function onScanSuccess(qrCodeMessage) {
  if (!hasExecuted) {
    hasExecuted = true;
    document.getElementById("result").innerHTML =
      '<span class="result">' + qrCodeMessage + "</span>";
    console.log(qrCodeMessage);

      sendValidate(qrCodeMessage);

  }
}

function sendValidate(data) {
  var raw = "";
  var requestOptions = {
    method: 'PUT',
    body: 'raw',
    redirect: 'follow'
  };

  fetch(data, requestOptions)
    .then(response => response.text())
    .then((result) => {
      console.log(result);
      document.getElementById("result").innerHTML =
        '<span class="result">' + result + "</span>";

    })
    .catch(error => console.log('Fehler:', error));

}



function onScanError(errorMessage) {
  // Handle Scan Error
}

// Setting up Qr Scanner properties
var html5QrCodeScanner = new Html5QrcodeScanner("reader", {
  fps: 10,
  qrbox: 250
});

// in
html5QrCodeScanner.render(onScanSuccess, onScanError);

const abmeldenButton = document.getElementById("abmelden-button");

abmeldenButton.addEventListener("click", function () {
  // Hier die URL der Zielseite einfügen, zu der Sie weiterleiten möchten
  const targetURL = "main.html"; // Ändern Sie dies entsprechend Ihrer Zielseite

  // Weiterleitung zur Zielseite
  window.location.href = targetURL;
});

var bild = document.getElementById("dsssi-logo");

// Füge einen Klick-Eventlistener hinzu
bild.addEventListener("click", function() {
  // Leite den Benutzer zur gewünschten Webseite weiter
  window.location.href = "main.html";
});
