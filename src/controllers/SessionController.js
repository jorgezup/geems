const User = require('../models/User')

const crypto = require('crypto')
const mailer = require('../config/lib/mailer')
const { hash } = require('bcryptjs')

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
    async forgotPassword(req, res) {
        try {
            const user = req.user
            const token = crypto.randomBytes(20).toString("hex")

            console.log(user.id)

            let now = new Date()
            now = now.setHours(now.getHours() + 1)

            await User.update({
                    reset_token: token,
                    reset_token_expires: now
                }, 
                {
                    where: { id: user.id}
                }
            )

            await mailer.sendMail({
                to: user.email,
                from: 'no-replay@geems.com.br',
                subject: 'Recuperação de Senha',
                html: `<h2>Token de Recuperação</h2>
                <p>Clique no link para recuperar sua senha.</p>
                <p>
                    <a href="http://localhost:3000/conta/reset-senha?token=${token}" target="_blank">
                        RECUPERAR SENHA
                    </a>
                </p>
                `
            })

            return res.render('session/forgot-password', {
                success: "Token de recuperação enviado para seu e-mail"
            })
        } catch (error) {
            console.error(error)
            return res.render('session/forgot-password', {
                error: "Erro inesperado, tente novamente!"
            })
        }
    },
    resetPasswordForm(req, res) {
        console.log(req.query.token)
        return res.render('session/reset-password', { token: req.query.token, req})
    },
    async resetPassword(req, res) {
        const { user } = req
        const { password, token } = req.body
        try {
            const newPassword = await hash(password, 8)

            await User.update({
                    password:newPassword,
                    reset_token: "",
                    reset_token_expires: "",
                }, {
                    where: { id: user.id }
                }
            )

            return res.render('session/login', {
                user: req.body,
                success: "Senha alterada com sucesso"
            })
        } catch (error) {
            console.error(error)
            return res.render('session/reset-password', {
                user: req.body,
                token,
                error: "Erro inesperado, tente novamente!"
            })
        }
    }
}