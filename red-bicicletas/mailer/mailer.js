const nodemailer = require('nodemailer');

const mailConfig = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'johanna30@ethereal.email',
        pass: '8XaEKm2Z4nePg5n2Me'
    }
});

module.exports = nodemailer.createTransport(mailConfig);

