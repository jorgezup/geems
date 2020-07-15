const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'jorgebertolo@gmail.com',
        pass: '62oqf8sotu@c'
    }
})

module.exports = transporter