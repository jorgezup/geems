const User = require('../models/User')

module.exports = {
    loginForm(req, res) {
        return res.render('session/login')
    },
    login(req, res) {
        console.log(req.user.id)
        req.session.userId = req.user.id 

        return res.redirect('/')
    },
    logout(req, res) {
        req.session.destroy()

        return res.redirect('/login')
    },
    forgotPasswordForm(req, res) {
        return res.render('session/forgot-password')
    },
    forgotPassword(req, res){

    },
    resetPasswordForm(req, res) {
        return res.render('session/reset-password', { token: req.query.token, req})
    },
    resetPassword(req, res){

    }

}