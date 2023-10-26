let transactionIdFilmhinzu;
async function generateKey7() {

  const url = 'https://backend-idempotency-provider.greenplant-9a54dc56.germanywestcentral.azurecontainerapps.io/generate-key/';

  const des = {
    "description": "Film_hinzufuegen"
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


generateKey7()
  .then(data => {
    if (data) {
      console.log('Generated key:', data.key);
      transactionIdFilmhinzu = data.key;

    }
  });

function generateOutput() {


  const transIdhinzu = transactionIdFilmhinzu;
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

  const filmInfo1 = `https://dsssi-backend-lookup.greenplant-9a54dc56.germanywestcentral.azurecontainerapps.io/filmHinzufuegen?titel=${titel}&genre=${genre}&fsk=${fsk}&dauer=${dauer}&erwachsen=${erwachsene}&ermaessigt=${sigterm}&kinder=${kinder}&kategorie=${kategorie}&beschreibung=${beschreibung}&trailerURL=${trailer}&transID=${transIdhinzu}`


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

      const customTextElement = document.getElementById('customText');
      customTextElement.textContent = 'Film erfolgreich hinzugefügt';
      generateKey7();
    })
    .catch(error => console.log('Fehler:', error));

}


document.getElementById("sendRequest").addEventListener("click", generateOutput);


window.addEventListener("beforeunload", function () {
  if (window.opener && !window.opener.closed) {
    window.opener.location.reload();
  }
});
