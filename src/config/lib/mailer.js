require('dotenv').config

const nodemailer = require('nodemailer')

// const transporter = nodemailer.createTransport({
//     service: 'gmail',
//     auth: {
//         user: process.env.NODEMAILER_USER,
//         pass: process.env.NODEMAILER_PASS
//     }
// })

// let pass = process.env.SENDGRID_API_KEY
// let transporter = nodemailer.createTransport({
//     host: "smtp.sendgrid.net",
//     port: 465,
//     secure: true, // true for 465, false for other ports
//     auth: {
//       user: 'apikey', // generated ethereal user
//       pass
//     },
//   });

let transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    type: 'OAuth2',
    user: process.env.MAIL_USERNAME,
    pass: process.env.MAIL_PASSWORD,
    clientId: process.env.OAUTH_CLIENTID,
    clientSecret: process.env.OAUTH_CLIENT_SECRET,
    refreshToken: process.env.OAUTH_REFRESH_TOKEN
  }
});  

module.exports = transporter