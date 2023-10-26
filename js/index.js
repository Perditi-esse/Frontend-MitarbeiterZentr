document.getElementById('anmelden').addEventListener('click', function (e) {
  e.preventDefault(); // Verhindert das Standardverhalten des Formulars (Seitenneuladen)

  // Benutzername aus dem Eingabefeld abrufen
  var username = document.getElementById('username').value;


  var password = document.getElementById('password').value;

  handleButtonClick(username, password);
  function handleButtonClick(name, passwort) {

    fetch(`https://dsssi-backend-user.greenplant-9a54dc56.germanywestcentral.azurecontainerapps.io/employeeLogin?username=${name}&passwort=${passwort}`, {
      method: 'POST',
    })
      .then(response => response.text())
      .then(data => {

        const resultsDiv = document.getElementById('results');
        resultsDiv.innerHTML = data;
        console.log(data);
        if (data === "true") {

          window.location.href = 'main.html';
        } else {
          resultsDiv.innerHTML = 'Benutzername oder Passwort falsch';
        }
      })
      .catch(error => console.error('Fehler bei der API-Anfrage:', error));
  }
});


