const { hash } = require('bcrypt')
const crypto = require('crypto')
const mailer = require('../config/lib/mailer')

const User = require('../models/User');
const Papel = require('../models/Papel');

module.exports = {
    async index(req, res) {
        const users = await User.findAll({
            attributes: ['id', 'nome', 'email', 'is_admin', 'disabled'],
            where: { disabled: false}
        })

        return res.render('users/admin/list', {users})
    },
    async store(req, res){
        let { nome, email, passaporte, papel_id, is_admin } = req.body
        const disabled = false

        const password = crypto.randomBytes(4).toString("hex")
        const passwordHash = await hash(password, 8)
        console.log(password)


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
            to: email,
            from: 'no-replay@geems.com.br',
            subject: 'Credenciais de Acesso ao GEEMs',
            html: `<h2>Credenciais</h2>
            <p>Bem vindo ao GEEMs</p>
            <p>Seu e-mail de login: ${email}</p>
            <p>Sua senha: ${password}</p>
            <h4>Recomendamos que seja feita a alteração de senha.</h4>
            `
        })

        return res.render('users/admin/send-email')
    },
    async create(req, res){
        const papeis = await Papel.findAll({raw:true})
        
        return res.render('users/admin/create', {papeis})
    },
    async show(req, res){
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

        console.log(user)
        return res.render('users/admin/show', {user})
    },
    async edit(req, res){
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
    },
    async update(req, res) {
        let { nome, email, passaporte, papel_id, is_admin } = req.body
        const id = req.body.id[0]

        console.log('chegou aquiS')
        console.log(req.body)
        console.log((id))

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
    },
    async delete(req, res) {
        const { id } = req.body

        await User.update({
            disabled: true,
            where: { id }
        })

        return res.render('users/admin/remove-success')
    }

}