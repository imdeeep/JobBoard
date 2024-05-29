require('dotenv').config();
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'Gmail',
    secure:true,
    port:465,
    auth: {
        user: 'jobboard867@gmail.com', 
        pass: process.env.PASSWORD
    }
});

module.exports = transporter;
