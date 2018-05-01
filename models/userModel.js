const connection = require("../db.js");
const bcrypt = require ('bcrypt');
const salt = 10;

let resultado = null;


exports.crear = function() {    
    connection.query('CREATE DATABASE IF NOT EXISTS test', function (err) {
        if (err) throw err;
        connection.query('USE test', function (err) {
            if (err) throw err;
            connection.query('CREATE TABLE IF NOT EXISTS users('
                + 'id INT NOT NULL AUTO_INCREMENT,'
                + 'PRIMARY KEY(id),'
                + 'name VARCHAR(30)'
                +  ')', function (err) {
                    if (err) throw err;
                });
        });
    });
};

exports.newUser = (username, pwd, mail, birthdate) => {
  return new Promise(function(resolve, reject) {
    connection.query('INSERT INTO users (username, pwd, email, birthdate) VALUES(?, ?, ?, ?)', [username, pwd, mail, birthdate], (err, result) => {
      if(err) {
        reject( new Error(err));
      } else {
        resolve(result);
      }
    });
  });
};

exports.getUserByNameOrMail = (username, mail) => {
  return new Promise( (resolve, reject) => {
    connection.query('SELECT * FROM users WHERE username = ? OR email = ?', [username, mail], (err, result) => {
      if(err) {
        reject(new Error(err));
      } else {
        resolve(result[0]);
      } 
    });
  });
};

exports.getUserById = (id) => {
  return new Promise( (resolve, reject) => {
    connection.query('SELECT * FROM users WHERE id = ?', id, (err, result) => {
      if(err) {
        rejecet(new Error(err));
      } else {
        resolve(result[0]);
      }
    });
  });
};

exports.hash = (pwd) => {
  return new Promise( (resolve, reject) => {
    bcrypt.hash(pwd, salt, (err, result) => {
      if(err) {
        reject(new Error(err));
      } else {
        resolve(result);
      }
    });
  });
};

exports.validPassword = (pwd, hashPassword) => {
  return new Promise( (resolve, reject) => {
    bcrypt.compare(pwd, hashPassword, (err, result) => {
      if(err) {
        reject(new Error(err));
      }else {
        resolve(result);
      }
    });
  });
}

