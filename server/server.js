// server.js
// Webserver - Node.js - Express

const express = require('express');
const model = require('./datenbank');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());


// http get request
app.get('/', (req, res) => {
  if (!req.body.id) {
    model.getAll().then(
      todo => {
        res.status(200);
        res.send(JSON.stringify(todo));
      }, error => {
        res.status(500);
        res.send(error.message);
      });
  } else {
    model.get(req.body.id).then(
      todo => {
        res.status(200);
        res.send(JSON.stringify(todo));
      }, error => {
        res.status(500);
        res.send(error.message);
      });
  }
});


// http post request
// post ohne id (auto increment)
app.post('/', (req, res, next) => {
  if (!req.body.id) {
    model.save(req.body).then(
      todoSave => {
        model.get(todoSave.insertId).then(
          todoGetOne => {
            res.status(200);
            res.send(JSON.stringify(todoGetOne));
          }, error => {
            res.status(500);
            res.send(error.message);
          });
      }, error => {
        res.send(error.message);
      }
      );
  } else {
    res.status(400).send('Bad Request - query parameter ID in http post method not allowed');
  }
});


// http delete request
// delete mit id
app.delete('/', (req, res) => {
  if (!req.body.id) {
    res.status(400).send('Bad Request - Missing ID as query parameter');
  } else {
    model.delete(req.body.id).then(
      todo => { 
        res.status(200);
        res.send(JSON.stringify(todo));
      }, error => {
        res.status(500);
        res.send(error.message);
      });
  }
});


// Webserver Port 8080
app.listen(8080, () => {
  console.log('Server listening on port 8080');
});
