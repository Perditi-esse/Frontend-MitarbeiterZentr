function generateOutputDelete() {



  const titel = document.getElementById('titelInputDelete').value;
  const filmInfoDelete = `https://dsssi-backend-lookup.greenplant-9a54dc56.germanywestcentral.azurecontainerapps.io/filmEntfernen?titel=${titel}`
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
    })
    .catch(error => console.log('Fehler:', error));

}

// Hinzufügen eines Klick-Ereignislisteners zum Button
document.getElementById("sendDelete-Button").addEventListener("click", generateOutputDelete);

window.addEventListener("beforeunload", function () {
  if (window.opener && !window.opener.closed) {
    window.opener.location.reload(); // Die Elternseite neu laden, wenn sie geöffnet ist
  }
});
