const nodemailer = require('nodemailer');

// ENVIRONMENT RAILWAY
if (process.env.NODE_ENV === "production") {
    const options = {
        auth: {
            api_key: process.env.SENDGRID_API_SECRET,
        },
    };
    mailConfig = sgTransport(options);
} else {
    if (process.env.NODE_ENV === "staging") {
        console,log('XXXXXXXXXXXXX');
        const options = {
            auth: {
                api_key: process.env.SENDGRID_API_SECRET,
            },
        };
        mailConfig = sgTransport(options);
    } else {
        mailConfig = {
            host: "gmail",
            auth: {
                user: process.env.ethereal_user,
                pass: process.env.ethereal_psw
            },
        };
    }
}

module.exports = nodemailer.createTransport(mailConfig);