function generateOutput() {


  const titel = document.getElementById('titelInput').value;
  const genre = document.getElementById('genreInput').value;
  const fsk = document.getElementById('fskInput').value;
  const dauer = document.getElementById('dauerInput').value;
  const erwachsene = document.getElementById('erwachseneInput').value;
  const ermassigt = document.getElementById('ermassigtInput').value;
  const kinder = document.getElementById('kinderInput').value;
  const kategorie = document.getElementById('kategorieInput').value;

  const filmInfo = `[Film{titel='${titel}', genre='${genre}', fsk=${fsk}, dauer=${dauer}, erwachsene=${erwachsene}, ermassigt=${ermassigt}, kinder=${kinder}, kategorie='${kategorie}'}]`;

  // In Variable speichern
  const outputVariable = filmInfo;

  // Auf der Webseite anzeigen
  document.getElementById('output').textContent = outputVariable;

  // In der Konsole anzeigen
  console.log(outputVariable);
}

const filmbild = document.getElementById("filmbild");
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
});
