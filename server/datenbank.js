// datenbank.js
// Datenbank Schnittstelle

const mysql = require('mysql');
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'foo',
  password: 'bar',
  database: 'todo',

});
connection.connect();


// SELECT ALL
function getAll() {
  return new Promise((resolve, reject) => {
    const query = 'SELECT * FROM liste';
    connection.query(query, (error, results) => {
      if (error) {
        console.log(error);
        reject(error);
      } else {
        resolve(results);
      }
    });
  });
}


// SELECT ID
function getOne(id) {
  return new Promise((resolve, reject) => {
    const query = 'SELECT * FROM liste WHERE id = ?';
    connection.query(query, [id], (error, results) => {
      if (error) {
        console.log(error);
        reject(error);
      } else {
        resolve(results[0]);
      }
    });
  });
}


// INSERT
function insert(todo) {
  return new Promise((resolve, reject) => {
    const query = 'INSERT INTO liste (titel) VALUES (?)';
    connection.query(query, [todo.titel], (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    });
  });
}


// DELETE
function remove(id) {
  return new Promise((resolve, reject) => {
    // const query = 'DELETE FROM liste WHERE id = ?';
    const query = 'DELETE FROM liste';
    connection.query(query, [id], (error, results) => {
      if (error) {
        console.log(error);
        reject(error);
      } else {
        resolve(results[0]);
      }
    });
  });
}


module.exports = {
  getAll,
  get(id) {
    return getOne(id);
  },
  delete(id) {
    return remove(id);
  },
  save(todo) {
    if (!todo.id) {
      return insert(todo);
    } else {
      return update(todo);
    }
  },
};