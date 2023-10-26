const abmeldenButton = document.getElementById("abmelden-button");

abmeldenButton.addEventListener("click", function () {

  window.location.href = "main.html";
});

let transactionsIDVor;
let transactionsIDVor2;
let transactionsIDVor3;


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






function fillTable(data) {
  data.forEach(event => {
    const tableId = `saal${event.kinosaal}`;
    const time = event.zeit === '14:00' ? '14:00 Uhr' : '20:00 Uhr';
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

async function generateKey1() {

  const url = 'https://backend-idempotency-provider.greenplant-9a54dc56.germanywestcentral.azurecontainerapps.io/generate-key/';

  const des = {
    "description": "Vorstellung_loeschen"
  };
  try {

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(des)
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

generateKey1()
  .then(data => {
    if (data) {
      console.log('Generated key:', data.key);
      transactionsIDVor = data.key;

    }
  });

function generateOutputDelete() {
    console.log("Test:")
  console.log(transactionsIDVor);

  const transIdVor = transactionsIDVor;

  const removeVor = document.getElementById('SaalplanIdDelete').value;

  const filmInfo2 = `https://dsssi-backend-lookup.greenplant-9a54dc56.germanywestcentral.azurecontainerapps.io/vorstellungEntfernen?sitzplan=${removeVor}&transID=${transIdVor}`

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
      console.log("Test:");
      console.log(transactionsIDVor);
      console.log(result);
      // Ihren eigenen Text in das HTML-Element einfügen
      const customTextElement = document.getElementById('customTextDeleteVor');
      customTextElement.textContent = 'Vorstellung erfolgreich gelöscht';
      generateKey1();
    })
    .catch(error => console.log('Fehler:', error));

}

// Hinzufügen eines Klick-Ereignislisteners zum Button
document.getElementById("entfernenVor").addEventListener("click", generateOutputDelete);



async function generateKey2() {

  const url = 'https://backend-idempotency-provider.greenplant-9a54dc56.germanywestcentral.azurecontainerapps.io/generate-key/';

  const des = {
    "description": "Vorstellung_hinzufuegen"
  };
  try {

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(des)
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


generateKey2()
    .then(data => {
        if (data) {
            console.log('Generated key:', data.key);
            transactionsIDVor2 = data.key;

        }
    });
function generateOutputVorAdd() {

  const transId3 = transactionsIDVor2
  const filmtitel1 = document.getElementById('filmtitel1').value;
  const datum1 = document.getElementById('datum1').value;
  const uhrzeit1 = document.getElementById('uhrzeit1').value;
  const kinosaal1 = document.getElementById('kinosaal1').value;


  const filmInfo3 = `https://dsssi-backend-lookup.greenplant-9a54dc56.germanywestcentral.azurecontainerapps.io/vorstellungHinzufuegen?filmTitel=${filmtitel1}&zeit=${uhrzeit1}&datum=${datum1}&kinosaal=${kinosaal1}&transID=${transId3}`

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
      generateKey2();
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

async function generateKey3() {

  const url = 'https://backend-idempotency-provider.greenplant-9a54dc56.germanywestcentral.azurecontainerapps.io/generate-key/';

  const des = {
    "description": "Vorstellung_bearbeiten"
  };
  try {

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(des)
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


generateKey3()
    .then(data => {
        if (data) {
            console.log('Generated key:', data.key);
            transactionsIDVor3 = data.key;

        }
    });

function generateOutputEdit() {
  const transId4 = transactionsIDVor3
  const titel12 = document.getElementById('filmtitelEdit').value;
  const datum12 = document.getElementById('datumEdit').value;
  const uhrzeit12 = document.getElementById('uhrzeitEdit').value;
  const kinosaal12 = document.getElementById('kinosaalEdit').value;
  const id12 = document.getElementById('idEdit').value;


  const filmInfo4 = `https://dsssi-backend-lookup.greenplant-9a54dc56.germanywestcentral.azurecontainerapps.io/vorstellungBearbeiten?filmTitel=${titel12}&zeit=${uhrzeit12}&datum=${datum12}&kinosaal=${kinosaal12}&sitzplan=${id12}&transID=${transId4}`


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
      generateKey3('Vorstellung_bearbeiten')
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

document.addEventListener('DOMContentLoaded', function () {
  fetch('https://dsssi-backend-lookup.greenplant-9a54dc56.germanywestcentral.azurecontainerapps.io/filmAnzeigen')
    .then(response => response.text())
    .then(data => {
      // Hier können Sie die Ergebnisse in Ihrer HTML-Oberfläche anzeigen
      const resultsDiv = document.getElementById('results');
      resultsDiv.innerHTML = data; // Zeigen Sie den API-Text in #results an
      console.log(data); // Gib den API-Text in der Konsole aus
      updateInputValuesTime(data);
      // Rufen Sie eine andere Funktion auf und übergeben Sie data
    })
    .catch(error => console.error('Fehler bei der API-Anfrage:', error));
});
function updateInputValuesTime(filmText) {
  //const filmText = "[Film{titel='Inception', genre='Science Fiction', fsk=16, dauer=148, erwachsene=2, ermaßigt=1, kinder=3, kategorie='Blockbuster'}, Film{titel='Interstellar', genre='Science Fiction', fsk=12, dauer=169, erwachsene=3, ermaßigt=2, kinder=2, kategorie='Blockbuster'}, Film{titel='The Shawshank Redemption', genre='Drama', fsk=12, dauer=142, erwachsene=4, ermaßigt=1, kinder=1, kategorie='Klassiker'}]";
  const filme = filmText.match(/titel='([^']+)'/g);

  const filmTitles = filme.map((film) => {
    const titleMatch = film.match(/titel='([^']+)'/);
    if (titleMatch) {
      return titleMatch[1];
    }
  });

  const filmTitlesString = filmTitles.join(', ');

  document.getElementById('inputFields').innerHTML = filmTitlesString;
}

