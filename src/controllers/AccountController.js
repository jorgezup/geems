const User = require('../models/User');
const Papel = require('../models/Papel');

const { hash } = require('bcryptjs')


module.exports = {
    async index(req, res) {
        const user = await User.findByPk(req.session.userId, {
            include:{model: Papel, as:'papel'},
            raw:true
        })

        const papeis = await Papel.findAll({raw:true})

        return res.render('users/edit', {user, papeis})
    },
    async update(req, res) {
        const { nome, email, passaporte, papel_id, is_admin } = req.body
        const id = req.body.id[0]

        const user = await User.update({
            nome,
            email,
            passaporte,
            papel_id,
            is_admin: is_admin || false
        },{
            where: { id }
        })

        return res.render('users/update-success')
    },
    async changePasswordForm(req, res) {
        const user = await User.findByPk(req.session.userId, {raw:true})

        return res.render('users/change-password', {user})
    },
    async changePassword(req, res) {
        const { id, password, passwordRepeat } = req.body

        const passed = password == passwordRepeat

        if (!passed) {
            return res.render('users/change-password', {
                user:req.body,
                error: "Senhas não coincidem"
            })
        }

        const passwordHash = await hash(password, 8)

        const user = await User.update({
            password:passwordHash
        }, { where: {id}})

        return res.render('users/update-success')
    }
}