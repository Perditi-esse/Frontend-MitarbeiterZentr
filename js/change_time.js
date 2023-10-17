const abmeldenButton = document.getElementById("abmelden-button");

abmeldenButton.addEventListener("click", function () {
  // Hier die URL der Zielseite einfügen, zu der Sie weiterleiten möchten
   // Ändern Sie dies entsprechend Ihrer Zielseite
  // Weiterleitung zur Zielseite
  window.location.href = "main.html";
});




function parseApiData(testData) {
  const dataEntries = testData.split("}, Vorstellung{");
  const parsedData = [];

  dataEntries.forEach(entry => {
    const entryParts = entry.split(', ');

    const filmTitel = entryParts[0].replace("filmTitel=", "").replace("[Vorstellung{", "").replace(/'/g, "");
    const zeit = entryParts[1].replace("zeit=", "");
    const datum = entryParts[2].replace("datum=", "");
    const kinosaal = parseInt(entryParts[3].replace("kinosaal=", ""), 10);
    const sitzplan = entryParts[4].replace("sitzplan=", "").slice(0, 9);



    const eventData = {
      filmTitel,
      zeit,
      datum,
      kinosaal,
      sitzplan,
    };
    parsedData.push(eventData);
  });

  return parsedData;
}

document.getElementById('update-button').addEventListener('click', fetchDataAndFillTable);

function fetchDataAndFillTable() {
  fetch('https://dsssi-backend-lookup.greenplant-9a54dc56.germanywestcentral.azurecontainerapps.io/vorstellungAnzeigen')
    .then(response => response.text())
    .then(data => {
      const resultsDiv = document.getElementById('results');
      resultsDiv.innerHTML = data;
      console.log(data);

      const parsedData = parseApiData(data);
      fillTable(parsedData);
    })
    .catch(error => console.error('Fehler bei der API-Anfrage:', error));
}




// Diese Funktion fügt die Daten in die Tabelle ein
/*function fillTable(data) {
  console.log(data);
  data.forEach(event => {
    const tableId = `saal${event.kinosaal}`;
    const time = event.zeit === '14:00:00' ? '14:00 Uhr' : '20:00 Uhr';
    const date = new Date(event.datum);
    const dayOfWeek = date.getDay(); // 0 (Sonntag) bis 6 (Samstag)

    // Spalten- und Zeilenindex ermitteln
    const columnIndex = dayOfWeek + 1; // +1, da die erste Spalte die Zeit ist
    const rowIndex = time === '14:00 Uhr' ? 1 : 2;

    // Daten in die Tabelle einfügen
    const cell = document.querySelector(`#${tableId} tr:nth-child(${rowIndex + 1}) td:nth-child(${columnIndex + 1})`);
    cell.textContent = event.filmTitel;
  });
}
*/

function fillTable(data) {
  data.forEach(event => {
    const tableId = `saal${event.kinosaal}`;
    const time = event.zeit === '14:00:00' ? '14:00 Uhr' : '20:00 Uhr';
    const date = new Date(event.datum);
    const dayOfWeek = date.getDay(); // 0 (Sonntag) bis 6 (Samstag)

    // Spalten- und Zeilenindex ermitteln
    const columnIndex = dayOfWeek + 1; // +1, da die erste Spalte die Zeit ist
    const rowIndex = time === '14:00 Uhr' ? 1 : 2;

    // Erstellen eines neuen Elements für den Filmtitel und die Sitzplan-Nummer
    const filmTitleElement = document.createElement('div');
    filmTitleElement.textContent = event.filmTitel.replace(/'/g, '');

    const cell = document.querySelector(`#${tableId} tr:nth-child(${rowIndex + 1}) td:nth-child(${columnIndex + 1})`);

    // Löschen des vorhandenen Inhalts in der Zelle
    cell.innerHTML = '';

    // Hinzufügen des Elements zur Zelle
    cell.appendChild(filmTitleElement);

    // Hinzufügen der Sitzplan-Nummer
    cell.innerHTML += `ID: ${event.sitzplan}`;
  });
}


function generateOutputDelete() {



  const removeVor = document.getElementById('SaalplanIdDelete').value;


  const filmInfo2 = `https://dsssi-backend-lookup.greenplant-9a54dc56.germanywestcentral.azurecontainerapps.io/vorstellungEntfernen?sitzplan=${removeVor}`

  // In Variable speichern


  // Auf der Webseite anzeigen
  //document.getElementById('output').textContent = filmInfo;

  // In der Konsole anzeigen
  console.log(filmInfo2);
  sendAPIRequestVorDelete(filmInfo2);


}

function sendAPIRequestVorDelete(data) {
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
      const customTextElement = document.getElementById('customTextDeleteVor');
      customTextElement.textContent = 'Vorstellung erfolgreich gelöscht';
    })
    .catch(error => console.log('Fehler:', error));

}

// Hinzufügen eines Klick-Ereignislisteners zum Button
document.getElementById("entfernenVor").addEventListener("click", generateOutputDelete);

function generateOutputVorAdd() {



  const filmtitel1 = document.getElementById('filmtitel1').value;
  const datum1 = document.getElementById('datum1').value;
  const uhrzeit1 = document.getElementById('uhrzeit1').value;
  const kinosaal1 = document.getElementById('kinosaal1').value;


  const filmInfo3 = `https://dsssi-backend-lookup.greenplant-9a54dc56.germanywestcentral.azurecontainerapps.io/vorstellungHinzufuegen?filmTitel=${filmtitel1}&zeit=${uhrzeit1}&datum=${datum1}&kinosaal=${kinosaal1}`
  const filmInfo = "https://dsssi-backend-lookup.greenplant-9a54dc56.germanywestcentral.azurecontainerapps.io/filmHinzufuegen?titel=test_1234dfkljhfah&genre=test&fsk=18&dauer=180&erwachsen=28&ermaessigt=11&kinder=13&kategorie=geilo&beschreibung=test123"
  // In Variable speichern


  // Auf der Webseite anzeigen
  //document.getElementById('output').textContent = filmInfo;

  // In der Konsole anzeigen
  console.log(filmInfo3);
  sendAPIRequestVorAdd(filmInfo3);


}

function sendAPIRequestVorAdd(data) {
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
      const customTextElement = document.getElementById('customTextAddVor');
      customTextElement.textContent = 'Vorstellung erfolgreich hinzugefügt';
    })
    .catch(error => console.log('Fehler:', error));

}

// Hinzufügen eines Klick-Ereignislisteners zum Button
document.getElementById("hinzufuegenVor").addEventListener("click", generateOutputVorAdd);


function reloadAndExecuteFunction() {
  location.reload(); // Seite neu laden


  // Warten, bis das DOM vollständig geladen ist
}

// Event Listener für den "entfernenVor"-Button
const entfernenVorButton = document.getElementById('entfernenVor');
entfernenVorButton.addEventListener('click', reloadAndExecuteFunction);

// Event Listener für den "hinzufuegenVor"-Button
const hinzufuegenVorButton = document.getElementById('hinzufuegenVor');
hinzufuegenVorButton.addEventListener('click', reloadAndExecuteFunction);

const bearbeitenVorButton = document.getElementById('edit');
bearbeitenVorButton.addEventListener('click', reloadAndExecuteFunction);

window.addEventListener('load', function() {
  setTimeout(fetchDataAndFillTable, 100); // Hier 1000 Millisekunden (1 Sekunde) Verzögerung
});


function generateOutputEdit() {



  const titel12 = document.getElementById('filmtitelEdit').value;
  const datum12 = document.getElementById('datumEdit').value;
  const uhrzeit12 = document.getElementById('uhrzeitEdit').value;
  const kinosaal12 = document.getElementById('kinosaalEdit').value;
  const id12 = document.getElementById('idEdit').value;


  const filmInfo4 = `https://dsssi-backend-lookup.greenplant-9a54dc56.germanywestcentral.azurecontainerapps.io/vorstellungBearbeiten?filmTitel=${titel12}&zeit=${uhrzeit12}&datum=${datum12}&kinosaal=${kinosaal12}&sitzplan=${id12}`
  const filmInfo = "https://dsssi-backend-lookup.greenplant-9a54dc56.germanywestcentral.azurecontainerapps.io/filmHinzufuegen?titel=test_1234dfkljhfah&genre=test&fsk=18&dauer=180&erwachsen=28&ermaessigt=11&kinder=13&kategorie=geilo&beschreibung=test123"
  // In Variable speichern


  // Auf der Webseite anzeigen
  //document.getElementById('output').textContent = filmInfo;

  // In der Konsole anzeigen
  console.log(filmInfo4);
  sendAPIRequestEdit(filmInfo4);

}

function sendAPIRequestEdit(data) {
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
document.getElementById("edit").addEventListener("click", generateOutputEdit);


var bild = document.getElementById("dsssi-logo");

// Füge einen Klick-Eventlistener hinzu
bild.addEventListener("click", function() {
  // Leite den Benutzer zur gewünschten Webseite weiter
  window.location.href = "main.html";
});
