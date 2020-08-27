// index.js
// Client - mobile Anwendung - To Do Liste

// Start Application
function init() {
  httpGET();
};


// http get
function httpGET() {
  let request = new XMLHttpRequest();
  request.onload = () => {
    if (request.status === 200) {
      let json;
      if (request.responseType === 'json') {
        json = request.response;
        getToDo(json);
        console.log(json);
      } else {
        json = JSON.parse(request.responseText);
        getToDo(json);
        console.log(json);
      }
    }
  };
  request.open('GET', 'http://localhost:8080', true);
  request.responseType = 'json';
  request.setRequestHeader('Accept', 'application/json');
  request.send();
};

// get todo
function getToDo(aListe) {
  var i;
  for (i = 0; i < aListe.length; i++) {
    var eintrag = document.createElement("li")
    var liste = document.getElementById("liste")

    let titel = aListe[i].titel;
    eintrag.innerHTML = titel;
    liste.appendChild(eintrag);
  }
};
 

// http post 
function httpPOST() {
  let todoValue = document.getElementById("todo").value;
  if (!todoValue) {
    alert("Kein Wert vorhanden!");
    return;
  }
  let todo = JSON.stringify({ "id": "", "titel": todoValue });
  let request = new XMLHttpRequest();
  request.onload = () => {
    if (request.status === 200) {
      let json;
      if (request.responseType === 'json') {
        json = request.response;
        addToDo(json);
        console.log(json);
      } else {
        json = JSON.parse(request.responseText);
        addToDo(json);
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

// add todo
function addToDo(oListe) {
  var eintrag = document.createElement("li")
  var liste = document.getElementById("liste")

  let titel = oListe.titel;
  eintrag.innerHTML = titel;
  liste.appendChild(eintrag);
};


// http delete
function httpDelete() {
  let todo = JSON.stringify({"id": "0"});
  let request = new XMLHttpRequest();
  request.onload = () => {
    if(request.status === 200) {
      console.log('Daten erfolgreich gelöscht.');
    }
  };
  request.open('DELETE', 'http://localhost:8080');
  request.setRequestHeader('Content-Type', 'application/json');
  request.send(todo);
  
  location.reload();
};


// Start Application
document.addEventListener('DOMContentLoaded', init);