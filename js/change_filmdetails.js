const popupButton = document.getElementById("hinzufügen-button");

popupButton.addEventListener("click", function () {
  // URL oder Inhalt des Pop-up-Fensters
  const popupURL = "popup_hinzufügen.html"; // Hier die URL oder den Inhalt des Pop-ups einfügen

  // Größe und Position des Pop-up-Fensters
  const popupWidth = 1000; // Breite des Pop-up-Fensters
  const popupHeight = 450; // Höhe des Pop-up-Fensters
  const left = (window.innerWidth - popupWidth) / 2; // Horizontal zentrieren
  const top = (window.innerHeight - popupHeight) / 2; // Vertikal zentrieren

  // Eigenschaften des Pop-up-Fensters
  const popupOptions = `
                width=${popupWidth},
                height=${popupHeight},
                top=${top},
                left=${left},
                resizable=yes,
                scrollbars=yes
            `;

  // Pop-up-Fenster öffnen
  window.open(popupURL, "_blank", popupOptions);
});

const popupButton1 = document.getElementById("entfernen-button");

popupButton1.addEventListener("click", function () {
  // URL oder Inhalt des Pop-up-Fensters
  const popupURL = "popup_entfernen.html"; // Hier die URL oder den Inhalt des Pop-ups einfügen

  // Größe und Position des Pop-up-Fensters
  const popupWidth = 1000; // Breite des Pop-up-Fensters
  const popupHeight = 450; // Höhe des Pop-up-Fensters
  const left = (window.innerWidth - popupWidth) / 2; // Horizontal zentrieren
  const top = (window.innerHeight - popupHeight) / 2; // Vertikal zentrieren

  // Eigenschaften des Pop-up-Fensters
  const popupOptions = `
                width=${popupWidth},
                height=${popupHeight},
                top=${top},
                left=${left},
                resizable=yes,
                scrollbars=yes
            `;

  // Pop-up-Fenster öffnen
  window.open(popupURL, "_blank", popupOptions);
});



// JavaScript für den Logout-Button
const logoutButton = document.getElementById("logout");

logoutButton.addEventListener("click", function () {
  // Hier die URL der Zielseite einfügen, zu der Sie weiterleiten möchten
  const targetURL = "main.html"; // Ändern Sie dies entsprechend Ihrer Zielseite

  // Weiterleitung zur Zielseite
  window.location.href = targetURL;
});

const abmeldenButton = document.getElementById("abmelden-button");

abmeldenButton.addEventListener("click", function () {
  // Hier die URL der Zielseite einfügen, zu der Sie weiterleiten möchten
  const targetURL = "main.html"; // Ändern Sie dies entsprechend Ihrer Zielseite

  // Weiterleitung zur Zielseite
  window.location.href = targetURL;
});



document.addEventListener('DOMContentLoaded', function () {
  fetch('https://dsssi-backend-lookup.greenplant-9a54dc56.germanywestcentral.azurecontainerapps.io/filmAnzeigen')
    .then(response => response.text())
    .then(data => {
      // Hier können Sie die Ergebnisse in Ihrer HTML-Oberfläche anzeigen
      const resultsDiv = document.getElementById('results');
      resultsDiv.innerHTML = data; // Zeigen Sie den API-Text in #results an
      console.log(data); // Gib den API-Text in der Konsole aus
      setupFilmTable(data);
      // Rufen Sie eine andere Funktion auf und übergeben Sie data
    })
    .catch(error => console.error('Fehler bei der API-Anfrage:', error));
});
function setupFilmTable(apiText) {

  console.log("API-Daten in andereFunktion:", apiText);
  const filmRegex = /Film{([^}]+)}/g;
  let films = [];
  let match;

  while ((match = filmRegex.exec(apiText)) !== null) {
    const filmData = match[1]; // Die Daten in den geschweiften Klammern
    films.push(`Film{${filmData}}`);
  }

  const filmSelector = document.getElementById('filmSelector');
  const filmTableBody = document.querySelector('#filmTable tbody');

  films.forEach((film, index) => {
    const titel = film.match(/titel='([^']+)'/)[1];
    const option = document.createElement('option');
    option.value = index;
    option.textContent = titel;
    filmSelector.appendChild(option);
  });

  filmSelector.addEventListener('change', () => {
    const selectedIndex = filmSelector.value;
    const selectedFilm = films[selectedIndex];
    updateFilmTable(selectedFilm);
  });

  function updateFilmTable(film) {
    const titel = film.match(/titel='([^']+)'/)[1];
    const genre = film.match(/genre='([^']+)'/)[1];
    const fsk = film.match(/fsk=(\d+)/)[1];
    const dauer = film.match(/dauer=(\d+)/)[1];
    const erwachsene = film.match(/erwachsene=(\d+)/)[1];
    const ermaßigt = film.match(/ermaessigt=(\d+)/)[1];
    const kinder = film.match(/kinder=(\d+)/)[1];
    const kategorie = film.match(/kategorie='([^']+)'/)[1];
    const filminfo = film.match(/beschreibung='([^']+)'/)[1];
    const html = film.match(/trailerURL='([^']+)'/)[1];

    filmTableBody.innerHTML = `
                    <tr>
                        <td class="film-cell"><input type="text" value="${titel}"></td>
                        <td class="film-cell"><input type="text" value="${genre}"></td>
                        <td class="film-cell"><input type="text" value="${fsk}"></td>
                        <td class="film-cell"><input type="text" value="${dauer}"></td>
                        <td class="film-cell"><input type="text" value="${kategorie}"></td>
                        <td class="film-cell"><input type="text" value="${erwachsene}"></td>
                        <td class="film-cell"><input type="text" value="${ermaßigt}"></td>
                        <td class="film-cell"><input type="text" value="${kinder}"></td>
                        <td class="film-cell"><input type="text" value="${filminfo}"></td>
                        <td class="film-cell"><input type="text" value="${html}"></td>
                    </tr>
                `;
  }
}
window.onload = setupFilmTable;

var bild = document.getElementById("dsssi-logo");

// Füge einen Klick-Eventlistener hinzu
bild.addEventListener("click", function() {
  // Leite den Benutzer zur gewünschten Webseite weiter
  window.location.href = "main.html";
});

