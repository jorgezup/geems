const User = require(`../models/User`)
const Papel = require("../models/Papel")

async function show(req, res, next) {
    try {
        const {id} = req.params
        const user = await User.findOne({
            where: {id},
        })

        if (!user || user.disabled) return res.render('not-found')
        
        req.user = user //passa o user na req

        next() //chama a próxima no caso, UserController -> show
    } catch (error) {
        console.error
        return res.render('users/admin/show', {
            error: 'Erro inesperado'
        })
    }
}

async function post(req, res, next) {
    try {
        let { email, passaporte } = req.body
        const papeis = await Papel.findAll()

        email = email.toLowerCase()
        passaporte = passaporte.toLowerCase()

        // Verifica e-mail
        const userEmail = await User.findOne({
            where: { email },
        })

        const users = await User.findAll({raw:true})

        for (user of users) {
            if (user.email == email && user.disabled==false) return res.render('users/admin/create', {
                user: req.body,
                papeis,
                error: 'E-mail já cadastrado!'
            })
            if (user.passaporte == passaporte && user.disabled==false) return res.render('users/admin/create', {
                user: req.body,
                papeis,
                error: 'Passaporte já cadastrado!'
            })
        }

        next()
    }
    catch (error) {
        console.error
        return res.render('users/admin/create', {
            error: 'Erro inesperado'
        })
    }
}

async function edit(req, res, next) {
    try {
        const {id} = req.params

        const user = await User.findOne({
            where: {id}
        })

        if (!user || user.disabled) return res.render('not-found')

        next()
    } 
    catch (error) {
        console.error
        return res.render('users/admin/edit', {
            error: 'Erro inesperado'
        })
    }
}

async function update(req, res, next) {
    try {  
        const { id } = req.body
        let { email, passaporte } = req.body
        
        email = email.toLowerCase()
        passaporte = passaporte.toLowerCase()

        const userReq = await User.findOne({
            where: { id: id[0] }, raw:true
        })

        const papeis = await Papel.findAll()
        const users = await User.findAll({raw:true})

        for(user of users) {
            if(user.email == email && user.id != userReq.id) {
                return res.render('users/admin/edit',{
                    user: userReq,
                    papeis,
                    error: "E-mail já cadastrado!"
                })
            }
            if(user.passaporte == passaporte && user.id != userReq.id) {
                return res.render('users/admin/edit',{
                    user: userReq,
                    papeis,
                    error: "Passaporte já cadastrado!"
                })
            }
        }

        next()
    } 
    catch (error) {
        console.error(error)
        return res.render('users/admin/edit', {
            error: 'Erro inesperado'
        })
    }
}

async function remove(req, res, next) {
    try { 
        const userId = req.session.userId
        const user = await User.findByPk(req.body.id)

        if (userId == user.id) return res.render('users/admin/delete-error')

        req.user = user
        next()
    } 
    catch (error) {
        console.error(error)
        return res.render('users/admin/edit', {
            error: 'Erro inesperado'
        })
    }
}

module.exports = {
    show,
    post,
    edit,
    update,
    remove
}