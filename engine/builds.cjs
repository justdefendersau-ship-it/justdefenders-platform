/**
 * JustDefenders ©
 * File: builds.cjs
 * Description: Save and retrieve builds
 */

const db = require("./db.cjs");
const { v4: uuidv4 } = require("uuid");

function saveBuild(userId, part, data) {
  return new Promise((resolve, reject) => {
    const id = uuidv4();

    db.run(
      "INSERT INTO saved_builds (id, user_id, part, data) VALUES (?, ?, ?, ?)",
      [id, userId, part, JSON.stringify(data)],
      function (err) {
        if (err) return reject(err);
        resolve({ id });
      }
    );
  });
}

function getBuilds(userId) {
  return new Promise((resolve, reject) => {
    db.all(
      "SELECT * FROM saved_builds WHERE user_id = ?",
      [userId],
      (err, rows) => {
        if (err) return reject(err);
        resolve(rows.map(r => ({
          ...r,
          data: JSON.parse(r.data)
        })));
      }
    );
  });
}

module.exports = {
  saveBuild,
  getBuilds
};