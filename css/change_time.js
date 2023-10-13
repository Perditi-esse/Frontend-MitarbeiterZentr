const abmeldenButton = document.getElementById("abmelden-button");

abmeldenButton.addEventListener("click", function () {
  // Hier die URL der Zielseite einfügen, zu der Sie weiterleiten möchten
  const targetURL = "main.html"; // Ändern Sie dies entsprechend Ihrer Zielseite

  // Weiterleitung zur Zielseite
  window.location.href = targetURL;
});




function parseApiData(testData) {
  // Entferne die äußeren Klammern und teile die Daten bei "},Vorstellung{" auf
  const dataEntries = testData.split("}, Vorstellung{");


  // Erstelle ein Array, um die Daten als JavaScript-Objekte zu speichern
  const parsedData = [];

  // Iteriere durch die Daten und erstelle JavaScript-Objekte
  dataEntries.forEach(entry => {
    // Extrahiere die einzelnen Werte mithilfe von regulären Ausdrücken
    const filmTitel = entry.match(/filmTitel='(.*?)'/)[1];
    const zeit = entry.match(/zeit=(.*?),/)[1];
    const datum = entry.match(/datum=(.*?),/)[1];
    const kinosaal = parseInt(entry.match(/kinosaal=(.*?),/)[1], 10);

    // Erstelle ein JavaScript-Objekt und füge es dem Array hinzu
    const eventData = {
      filmTitel,
      zeit,
      datum,
      kinosaal,
    };
    parsedData.push(eventData);
  });

  return parsedData;
}

document.getElementById('update-button').addEventListener('click', function () {
  fetch('https://dsssi-backend-lookup.greenplant-9a54dc56.germanywestcentral.azurecontainerapps.io/vorstellungAnzeigen')
    .then(response => response.text())
    .then(data => {
      // Hier können Sie die Ergebnisse in Ihrer HTML-Oberfläche anzeigen
      const resultsDiv = document.getElementById('results');
      resultsDiv.innerHTML = data; // Zeigen Sie den API-Text in #results an
      console.log(data); // Gib den API-Text in der Konsole aus

      // Rufen Sie eine andere Funktion auf und übergeben Sie data
      const parsedData = parseApiData(data);
      fillTable(parsedData);
    })
    .catch(error => console.error('Fehler bei der API-Anfrage:', error));
});



// Diese Funktion fügt die Daten in die Tabelle ein
function fillTable(data) {
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

