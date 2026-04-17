function sendEmail(to, message) {
  console.log("[EMAIL] to: " + to + " | " + message);
}

function sendSMS(to, message) {
  console.log("[SMS] to: " + to + " | " + message);
}

module.exports = {
  sendEmail,
  sendSMS
};
