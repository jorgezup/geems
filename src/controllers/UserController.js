const { hash } = require('bcrypt')
const crypto = require('crypto')

const User = require('../models/User');

module.exports = {
    async index(req, res) {
        const users = await User.findAll({
            attributes: ['id', 'nome', 'email', 'is_admin'],
        })

        return res.render('users/admin/list', {users})
    },
    async store(req, res){
        let { nome, email, passaporte, cargo, is_admin } = req.body
        const password = crypto.randomBytes(4).toString("hex")
        const passwordHash = await hash(password, 8)
        console.log(password)


        const user = await User.create({
            nome,
            email,
            passaporte,
            cargo,
            password:passwordHash,
            is_admin:is_admin || false
        })

        return res.render('index')
    },
    async create(req, res){
        return res.render('users/admin/create')
    },
    async show(req, res){
        const { id } = req.params 

        const user = await User.findByPk(id, {
            attributes: [
                'id',
                'nome',
                'email',
                'is_admin'
            ]
        })

        return res.render('users/admin/show', {user})
    },
    async edit(req, res){
        const { id } = req.params 

        const user = await User.findByPk(id, {
            attributes: [
                'id',
                'nome',
                'email',
                'is_admin'
            ]
        })

        return res.render('users/admin/edit', {user})
    },
    async update(req, res) {
        const { nome, email, is_admin } = req.body
        const id = req.body.id[0]

        console.log(req.body)

        const user = await User.update({
            nome: nome,
            email: email,
            is_admin: is_admin || false
        },{
            where: { id }
        })

        return res.redirect('users')
    },
    async delete(req, res) {
        const { id } = req.body

        await User.destroy({
            where: {
                id
            }
        })

        return res.redirect('users')
    }

}