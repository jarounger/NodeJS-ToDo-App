'use strict';
function init() {
  let todo = JSON.stringify({"id": "", "titel": "TESTTEST", "inhalt": "änderrrrrrern"});
  let request = new XMLHttpRequest();
  request.onload = () => {
    if(request.status === 200) {
      console.log('Daten erfolgreich versendet.');
    }
  };
  request.open('POST', 'http://localhost:8080');
  request.setRequestHeader('Content-Type', 'application/json');
  request.send(todo);
}
document.addEventListener('DOMContentLoaded', init);
