
// Start Application
function init() {
  httpGET();
};


// Get ToDo
function httpGET() {
  let request = new XMLHttpRequest();
  request.onload = () => {
    if (request.status === 200) {
      let json;
      if (request.responseType === 'json') {
        json = request.response;
        addToDoFromHttpGet(json);
        console.log(json);
      } else {
        json = JSON.parse(request.responseText);
        addToDoFromHttpGet(json);
        console.log(json);
      }
    }
  };
  request.open('GET', 'http://localhost:8080', true);
  request.responseType = 'json';
  request.setRequestHeader('Accept', 'application/json');
  request.send();
};

function addToDoFromHttpGet(aListe) {
  var i;
  for (i = 0; i < aListe.length; i++) {
    var eintrag = document.createElement("li")
    var liste = document.getElementById("liste")

    let id = aListe[i].id;
    let titel = aListe[i].titel;
    let inhalt = aListe[i].inhalt;
    eintrag.innerHTML = titel;
    liste.appendChild(eintrag);
  }
};


// Post ToDo 
function httpPOST() {
  let todoValue = document.getElementById("todo").value;
  if (!todoValue) {
    alert("Kein Wert vorhanden!");
    return;
  }
  let todo = JSON.stringify({ "id": "", "titel": todoValue, "inhalt": todoValue });
  let request = new XMLHttpRequest();
  request.onload = () => {
    if (request.status === 200) {
      let json;
      if (request.responseType === 'json') {
        json = request.response;
        addToDoFromHttpPost(json);
        console.log(json);
      } else {
        json = JSON.parse(request.responseText);
        addToDoFromHttpPost(json);
        console.log(json);
      }
      console.log('Daten erfolgreich versendet.');

    } else {
      console.log('Daten NICHT erfolgreich versendet.');
    }
  };
  request.open('POST', 'http://localhost:8080');
  request.setRequestHeader('Content-Type', 'application/json');
  request.send(todo);
};

function addToDoFromHttpPost(oListe) {
  var eintrag = document.createElement("li")
  var liste = document.getElementById("liste")

  let id = oListe.id;
  let titel = oListe.titel;
  let inhalt = oListe.inhalt;
  eintrag.innerHTML = titel;
  liste.appendChild(eintrag);
};


// Start Application
document.addEventListener('DOMContentLoaded', init);