/**
 * JustDefenders ©
 * File: auth.cjs
 * Description: Basic auth system
 */

const db = require("./db.cjs");
const { v4: uuidv4 } = require("uuid");

function register(username, password) {
  return new Promise((resolve, reject) => {
    const id = uuidv4();

    db.run(
      "INSERT INTO users (id, username, password) VALUES (?, ?, ?)",
      [id, username, password],
      function (err) {
        if (err) return reject(err);
        resolve({ id, username });
      }
    );
  });
}

function login(username, password) {
  return new Promise((resolve, reject) => {
    db.get(
      "SELECT * FROM users WHERE username = ? AND password = ?",
      [username, password],
      (err, row) => {
        if (err) return reject(err);
        if (!row) return reject("Invalid credentials");
        resolve(row);
      }
    );
  });
}

module.exports = {
  register,
  login
};