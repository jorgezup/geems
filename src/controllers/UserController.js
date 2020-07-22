const { hash } = require('bcrypt')
const crypto = require('crypto')
const mailer = require('../config/lib/mailer')

const User = require('../models/User');
const Papel = require('../models/Papel');

module.exports = {
    async index(req, res) {
        try {
            const users = await User.findAll({
                attributes: ['id', 'nome', 'email', 'is_admin', 'disabled'],
                where: { disabled: false}
            })

            return res.render('users/admin/list', {users})
        } catch (error) {
            console.error
            return res.render('error', {
                error: 'Erro inesperado'
            })
        }
    },
    async store(req, res){
        try {
            let { nome, email, passaporte, papel_id, is_admin } = req.body
            const disabled = false

            const password = crypto.randomBytes(4).toString("hex")
            const passwordHash = await hash(password, 8)

            const user = await User.create({
                nome,
                email,
                passaporte,
                papel_id,
                password:passwordHash,
                is_admin:is_admin || false,
                disabled
            })

            await mailer.sendMail({
                from: '"GEEMS" <jorge_bertolo@hotmail.com>',
                to: email,
                subject: 'Credenciais de Acesso ao GEEMs',
                html: `<h2>Credenciais</h2>
                <p>Bem vindo ao GEEMs</p>
                <p>Acesse: <a href="https://geems.herokuapp.com/" target="_blank">https://geems.herokuapp.com/</a></p>
                <p>Seu e-mail de login: ${email}</p>
                <p>Sua senha: ${password}</p>
                <h4>Recomendamos que seja feita a alteração de senha.</h4>
                `
            })

            return res.render('users/admin/send-email')
        } catch (error) {
            console.error
            return res.render('error', {
                error: 'Erro inesperado'
            })
        }
    },
    async create(req, res){
        try {
            console.log('aqui')
            const papeis = await Papel.findAll({raw:true})
            
            return res.render('users/admin/create', {papeis})
        } catch (error) {
            console.error
            return res.render('error')
        }
    },
    async show(req, res){
        try {
            const { id } = req.params 

            const user = await User.findByPk(id, {
                attributes: [
                    'id',
                    'nome',
                    'email',
                    'passaporte',
                    'papel_id',
                    'is_admin',
                    'disabled'
                ],
                include:{model: Papel, as:'papel'},
                raw:true
            })

            return res.render('users/admin/show', {user})
        } catch (error) {
            console.error
            return res.render('error')
        }
    },
    async edit(req, res){
        try {
            const { id } = req.params 

            const user = await User.findByPk(id, {
                attributes: [
                    'id',
                    'nome',
                    'email',
                    'passaporte',
                    'papel_id',
                    'is_admin'
                ]
            })

            const papeis = await Papel.findAll({raw:true})

            return res.render('users/admin/edit', {user, papeis})
        } catch (error) {
            console.error
            return res.render('error', {
                error: 'Erro inesperado'
            })
        }
    },
    async update(req, res) {
        try {
            let { nome, email, passaporte, papel_id, is_admin } = req.body
            const id = req.body.id[0]

            nome = nome.toLowerCase()
            email = email.toLowerCase()
            passaporte = passaporte.toLowerCase()

            const user = await User.update({
                nome,
                email,
                passaporte,
                papel_id,
                is_admin: is_admin || false
            },{
                where: { id }
            })

            return res.redirect('users/list')
        } catch (error) {
            console.error
            return res.render('error', {
                error: 'Erro inesperado'
            })
        }
    },
    async delete(req, res) {
        try {
            const { id } = req.body

            await User.update({
                email:"null",
                password:"null",
                disabled:true
            },{
                where: { id }
            })

            return res.render('users/admin/remove-success')
        } catch (error) {
            console.error
            return res.render('error', {
                error: 'Erro inesperado'
            })
        }
    }

}