let transactionIdFilmdelete;
async function generateKey6() {

  const url = 'https://backend-idempotency-provider.greenplant-9a54dc56.germanywestcentral.azurecontainerapps.io/generate-key/';

  const des = {
    "description": "Film_entfernen"
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


generateKey6()
  .then(data => {
    if (data) {
      console.log('Generated key:', data.key);
      transactionIdFilmdelete = data.key;

    }
  });


function generateOutputDelete() {


  const transIddelte = transactionIdFilmdelete;
  const titel = document.getElementById('titelInputDelete').value;
  const filmInfoDelete = `https://dsssi-backend-lookup.greenplant-9a54dc56.germanywestcentral.azurecontainerapps.io/filmEntfernen?titel=${titel}&transID=${transIddelte}`
  console.log(filmInfoDelete);
  sendAPIRequestDelete(filmInfoDelete);
  }


function sendAPIRequestDelete(data) {
  var raw = "";
  var requestOptions = {
    method: 'POST',
    body: 'raw',
    redirect: 'follow'
  };

  fetch(data, requestOptions)
    .then(response => response.text())
    .then(result => {
      console.log(result);
      // Ihren eigenen Text in das HTML-Element einfügen
      const customTextElement = document.getElementById('customTextDelete');
      customTextElement.textContent = 'Film erfolgreich entfernt';
      generateKey6();
    })
    .catch(error => console.log('Fehler:', error));

}


document.getElementById("sendDelete-Button").addEventListener("click", generateOutputDelete);

window.addEventListener("beforeunload", function () {
  if (window.opener && !window.opener.closed) {
    window.opener.location.reload();
  }
});
