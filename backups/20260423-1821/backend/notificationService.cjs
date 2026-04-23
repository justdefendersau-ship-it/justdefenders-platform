//
// File: backend/notificationService.cjs
// JustDefenders ©
// Phase 5L — Email + SMS notifications
//

const nodemailer = require("nodemailer");
const https = require("https");

// ----------------------------------------------------------------------------------------------
// EMAIL CONFIG
// ----------------------------------------------------------------------------------------------

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

// ----------------------------------------------------------------------------------------------
// SEND EMAIL
// ----------------------------------------------------------------------------------------------

async function sendEmail(subject, message) {

    try {
        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: process.env.EMAIL_TO,
            subject: subject,
            text: message
        });

        console.log("📧 Email sent");

    } catch (err) {
        console.log("Email failed");
    }
}

// ----------------------------------------------------------------------------------------------
// SEND SMS (Twilio)
// ----------------------------------------------------------------------------------------------

function sendSMS(message) {

    const sid = process.env.TWILIO_SID;
    const token = process.env.TWILIO_TOKEN;

    const data = new URLSearchParams({
        To: process.env.TWILIO_TO,
        From: process.env.TWILIO_FROM,
        Body: message
    }).toString();

    const options = {
        hostname: "api.twilio.com",
        path: `/2010-04-01/Accounts/${sid}/Messages.json`,
        method: "POST",
        auth: `${sid}:${token}`,
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "Content-Length": data.length
        }
    };

    const req = https.request(options, res => {
        res.on("data", () => {});
    });

    req.write(data);
    req.end();

    console.log("📱 SMS sent");
}

module.exports = { sendEmail, sendSMS };