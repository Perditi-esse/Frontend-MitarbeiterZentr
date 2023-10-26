const logoutButton = document.getElementById("abmelden-button");

logoutButton.addEventListener("click", function () {

  const targetURL = "index.html";


  window.location.replace(targetURL);
});

const changeButton = document.getElementById("control");

changeButton.addEventListener("click", function () {

  const targetURL1 = "qrcode.html";

  window.location.href = targetURL1;
});

const changeFilmButton = document.getElementById("changeFilm");

changeFilmButton.addEventListener("click", function () {

  const targetURL2 = "change_filmdetails.html";


  window.location.href = targetURL2;
});


const editsaalButton = document.getElementById("edit Saal");

editsaalButton.addEventListener("click", function () {

  const targetURL3 = "change_saal.html";


  window.location.href = targetURL3;
});

const edittimeButton = document.getElementById("edit time");

edittimeButton.addEventListener("click", function () {

  const targetURL4 = "change_time.html";


  window.location.href = targetURL4;
});


const deleteButton = document.getElementById("delete");

deleteButton.addEventListener("click", function () {

  const targetURL5 = "booking_storn.html";

  window.location.href = targetURL5;
});


const userButton = document.getElementById("users");

userButton.addEventListener("click", function () {

  const targetURL6 = "user_show.html";

  window.location.href = targetURL6;
});

const pictureButton = document.getElementById("pictures");

pictureButton.addEventListener("click", function () {

  const targetURL7 = "https://backendfiles.greenplant-9a54dc56.germanywestcentral.azurecontainerapps.io/";

  window.location.href = targetURL7;
});

const bookButton = document.getElementById("book");

bookButton.addEventListener("click", function () {

  const targetURL7 = "https://dsssi-frontend-web.greenplant-9a54dc56.germanywestcentral.azurecontainerapps.io/Men%C3%BCleiste/Programm.html";

  window.location.href = targetURL7;
});
