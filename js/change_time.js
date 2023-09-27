const abmeldenButton = document.getElementById("abmelden-button");

abmeldenButton.addEventListener("click", function () {
  // Hier die URL der Zielseite einfügen, zu der Sie weiterleiten möchten
  const targetURL = "main.html"; // Ändern Sie dies entsprechend Ihrer Zielseite

  // Weiterleitung zur Zielseite
  window.location.href = targetURL;
});



function getTitleValues() {
  const filmText = "[Film{titel='Inception', genre='Science Fiction', fsk=16, dauer=148, erwachsene=2, ermaßigt=1, kinder=3, kategorie='Blockbuster'}, Film{titel='Interstellar', genre='Science Fiction', fsk=12, dauer=169, erwachsene=3, ermaßigt=2, kinder=2, kategorie='Blockbuster'}, Film{titel='The Shawshank Redemption', genre='Drama', fsk=12, dauer=142, erwachsene=4, ermaßigt=1, kinder=1, kategorie='Klassiker'}]";

  const filme = filmText.match(/titel='([^']+)'/g);

  // Löschen Sie die vorhandenen Optionen in allen Dropdown-Listen
  const dropdowns = document.querySelectorAll('.film-dropdown');
  dropdowns.forEach((dropdown) => {
    dropdown.innerHTML = '';
  });

  // Für jeden Film fügen Sie eine Option zu allen Dropdown-Listen hinzu
  for (let i = 0; i < filme.length; i++) {
    const film = filme[i];
    const titel = film.match(/titel='([^']+)'/)[1];

    dropdowns.forEach((dropdown) => {
      const option = document.createElement('option');
      option.text = titel;
      dropdown.add(option);
    });
  }
}
