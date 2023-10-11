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




function updateInputValues() {

  const filmText = " [Film{titel='Filmtitel', genre='Filmgenre', fsk=6, dauer=120, erwachsene=18, ermaßigt=12, kinder=6, kategorie='Filmkategorie'}, Film{titel='Inception', genre='Science Fiction', fsk=16, dauer=148, erwachsene=2, ermaßigt=1, kinder=3, kategorie='Blockbuster'}, Film{titel='Interstellar', genre='Science Fiction', fsk=12, dauer=169, erwachsene=3, ermaßigt=2, kinder=2, kategorie='Blockbuster'}, Film{titel='The Shawshank Redemption', genre='Drama', fsk=12, dauer=142, erwachsene=4, ermaßigt=1, kinder=1, kategorie='Klassiker'}]";

  const filme = filmText.match(/Film{[^}]+}/g);


  document.getElementById('inputFields').innerHTML = '';


  for (let i = 0; i < filme.length; i++) {
    const film = filme[i];
    const titel = film.match(/titel='([^']+)'/)[1];
    const genre = film.match(/genre='([^']+)'/)[1];
    const fsk = film.match(/fsk=(\d+)/)[1];
    const dauer = film.match(/dauer=(\d+)/)[1];
    const erwachsene = film.match(/erwachsene=(\d+)/)[1];
    const ermaßigt = film.match(/ermaßigt=(\d+)/)[1];
    const kinder = film.match(/kinder=(\d+)/)[1];
    const kategorie = film.match(/kategorie='([^']+)'/)[1];
   // const filminfo = film.match(/filminfo='([^'´’]+)'/)[1];



    const inputFields = document.getElementById('inputFields');
    inputFields.innerHTML += `
         <div>
  <div class="film-table">
    <div class="film-image">
      <img src="${titel}.jpg" alt="${titel}">
      <input type="file" accept="image/*" id="bild-upload2">
    </div>
    <div class="film-cell">
      <!-- Reihe mit 3 Boxen -->
      <div class="info-box">
        <div class="info-label">Titel:</div>
        <input type="text" id="titelInput${i + 1}" placeholder="Titel" value="${titel}">
        <input type="hidden" id="imagePathInput">
      </div>
      <div class="info-box">
        <div class="info-label">Genre:</div>
        <input type="text" id="genreInput${i + 1}" placeholder="Genre" value="${genre}">
      </div>
      <div class="info-box">
        <div class="info-label">FSK:</div>
        <input type="text" id="fskInput${i + 1}" placeholder="FSK" value="${fsk}">
      </div>
      <div class="info-box">
        <div class="info-label">Dauer:</div>
        <input type="text" id="dauerInput${i + 1}" placeholder="Dauer" value="${dauer}">
      </div>
    </div>
    <div class="film-cell">
      <!-- 4 Boxen in der rechten Spalte -->
      <div class="info-box">
        <div class="info-label">Kategorie:</div>
        <input type="text" id="kategorieInput${i + 1}" placeholder="Kategorie" value="${kategorie}">
      </div>
      <div class="info-box">
        <div class="info-label">Erwachsene:</div>
        <input type="text" id="erwachseneInput${i + 1}" placeholder="Erwachsene" value="${erwachsene}">
      </div>
      <div class="info-box">
        <div class="info-label">Schüler, Azubi, Student:</div>
        <input type="text" id="ermaßigtInput${i + 1}" placeholder="Ermaßigt" value="${ermaßigt}">
      </div>
      <div class="info-box">
        <div class="info-label">Kinder:</div>
        <input type="text" id="kinderInput${i + 1}" placeholder="Kinder" value="${kinder}">
      </div>
    </div>




  <div class="table-spacing"></div>
</div>
        `;
  }

}

document.getElementById('submitButton').addEventListener('click', function () {
  fetch('https://dsssi-backend-lookup.greenplant-9a54dc56.germanywestcentral.azurecontainerapps.io/filmAnzeigen')
    .then(response => response.text())
    .then(data => {
      // Hier können Sie die Ergebnisse in Ihrer HTML-Oberfläche anzeigen
      const resultsDiv = document.getElementById('results');
      resultsDiv.innerHTML = data; // Zeigen Sie den API-Text in #results an
      console.log(data); // Gib den API-Text in der Konsole aus

      // Rufen Sie eine andere Funktion auf und übergeben Sie data
    })
    .catch(error => console.error('Fehler bei der API-Anfrage:', error));
});

