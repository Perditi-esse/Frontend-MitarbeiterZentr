function generateOutput() {



  const titel = document.getElementById('titelInput').value;
  const genre = document.getElementById('genreInput').value;
  const fsk = document.getElementById('fskInput').value;
  const dauer = document.getElementById('dauerInput').value;
  const erwachsene = document.getElementById('erwachseneInput').value;
  const sigterm = document.getElementById('sigtermInput').value;
  const kinder = document.getElementById('kinderInput').value;
  const kategorie = document.getElementById('kategorieInput').value;
  const beschreibung = document.getElementById('beschreibungInput').value;
  const trailer = document.getElementById('trailerInput').value;

  const filmInfo1 = `https://dsssi-backend-lookup.greenplant-9a54dc56.germanywestcentral.azurecontainerapps.io/filmHinzufuegen?titel=${titel}&genre=${genre}&fsk=${fsk}&dauer=${dauer}&erwachsen=${erwachsene}&ermaessigt=${sigterm}&kinder=${kinder}&kategorie=${kategorie}&beschreibung=${beschreibung}&trailerURL=${trailer}`
  const filmInfo = "https://dsssi-backend-lookup.greenplant-9a54dc56.germanywestcentral.azurecontainerapps.io/filmHinzufuegen?titel=test_1234dfkljhfah&genre=test&fsk=18&dauer=180&erwachsen=28&ermaessigt=11&kinder=13&kategorie=geilo&beschreibung=test123"
  // In Variable speichern


  // Auf der Webseite anzeigen
  //document.getElementById('output').textContent = filmInfo;

  // In der Konsole anzeigen
  console.log(filmInfo1);
  sendAPIRequest(filmInfo1);

}

function sendAPIRequest(data) {
  console.log(data);
  var raw = "";
  var requestOptions = {
    method: 'POST',
    body: 'raw',
    redirect: 'follow'
  };
  console.log(data);
  fetch(data, requestOptions)
    .then(response => response.text())
    .then(result => {
      console.log(result);
      // Ihren eigenen Text in das HTML-Element einfügen
      const customTextElement = document.getElementById('customText');
      customTextElement.textContent = 'Film erfolgreich hinzugefügt';
    })
    .catch(error => console.log('Fehler:', error));

}

// Hinzufügen eines Klick-Ereignislisteners zum Button
document.getElementById("sendRequest").addEventListener("click", generateOutput);

/*const filmbild = document.getElementById("filmbild");
const bildUpload = document.getElementById("bild-upload");

bildUpload.addEventListener("change", function () {
  const selectedFile = this.files[0];

  if (selectedFile) {
    const reader = new FileReader();
    reader.onload = function (e) {
      filmbild.src = e.target.result;
    };
    reader.readAsDataURL(selectedFile);
  }
});*/
window.addEventListener("beforeunload", function () {
  if (window.opener && !window.opener.closed) {
    window.opener.location.reload(); // Die Elternseite neu laden, wenn sie geöffnet ist
  }
});
