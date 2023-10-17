document.getElementById('anmelden').addEventListener('click', function (e) {
  e.preventDefault(); // Verhindert das Standardverhalten des Formulars (Seitenneuladen)

  // Benutzername aus dem Eingabefeld abrufen
  var username = document.getElementById('username').value;

  // Überprüfen, ob der Benutzername die gewünschten Bedingungen erfüllt
  if (username.length >= 5 && username.length <= 10) {
    document.getElementById('message').textContent = 'Benutzername ist okay.';
    // Fügen Sie hier den Code für die weitere Verarbeitung hinzu, z.B. das Senden an einen Server.
  } else {
    document.getElementById('message').textContent = 'Benutzername muss zwischen 5 und  10 Zeichen lang sein.';
  }
  var password = document.getElementById('password').value;
  var zahlen = /\d/;
  var Buchstaben = /[a-zA-Z]/;

  // Überprüfen, ob das Passwort die gewünschten Bedingungen erfüllt
  if (password.length >= 8 && zahlen.test(password) && Buchstaben.test(password)) {
    document.getElementById('message_p').textContent = 'Passwort ist okay.';
    // Fügen Sie hier den Code für die weitere Verarbeitung hinzu, z.B. das Senden an einen Server.
  } else {
    document.getElementById('message_p').textContent = 'Passwort muss mindestens 8 Zeichen, 1 Zahl und 1 Buchstaben enthalten.';
  }

  var text1 = document.getElementById('message').textContent;
  var text2 = document.getElementById('message_p').textContent;

  if (text1.includes('okay') && text2.includes('okay')){
      window.location.href='main.html';


  }

});


