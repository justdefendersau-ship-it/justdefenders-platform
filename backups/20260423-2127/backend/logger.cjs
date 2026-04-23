const fs = require('fs');

function log(msg) {
    fs.appendFileSync('data/system.log', new Date().toISOString() + " | " + msg + "\n");
}

module.exports = { log };
