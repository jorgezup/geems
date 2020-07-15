const User = require(`../models/User`)
const Papel = require("../models/Papel")
const { where } = require("sequelize")

async function show(req, res, next) {
    const {id} = req.params
    console.log(`aqui`)

    const user = await User.findOne({
        where: {id},
    })

    if (!user || user.disabled) return res.render('not-found')
    
    req.user = user //passa o user na req

    next() //chama a próxima no caso, UserController -> show
}

async function post(req, res, next) {
    let { email, passaporte } = req.body
    const papeis = await Papel.findAll()

    email = email.toLowerCase()
    passaporte = passaporte.toLowerCase()

    // Verifica e-mail
    const userEmail = await User.findOne({
        where: { email }
    })
    if (userEmail) return res.render('users/admin/create', {
        user: req.body,
        papeis,
        error: 'E-mail já cadastrado!'
    })

    // Verifica passaporte
    const userPassaporte = await User.findOne({
        where: { passaporte }
    })
    if (userPassaporte) return res.render('users/admin/create', {
        user: req.body,
        papeis,
        error: 'Passaporte já cadastrado!'
    })

    next()
}

async function edit(req, res, next) {
    const {id} = req.params

    const user = await User.findOne({
        where: {id}
    })

    if (!user || user.disabled) return res.render('not-found')

    next()
}

async function update(req, res, next) {
    let { id, email, passaporte } = req.body
    
    email = email.toLowerCase()
    passaporte = passaporte.toLowerCase()
    
    const users = await User.findAll({raw:true})
    const papeis = await Papel.findAll()

    console.log(req.body)

    const userEmail = await User.findAll({where:{email}})
    if(userEmail) return res.render('users/admin/edit',{
        user: req.body,
        papeis,
        error: "E-mail já cadastrado!"
    })

    const userPassaporte = await User.findAll({where:{passaporte}})

    for (user of users) {
        if (id[0] == user.email) {
            if (id[0] != user.id) {
                return res.render('users/admin/edit',{
                    user: req.body,
                    papeis,
                    error: "E-mail já cadastrado!"
                })
            }
        }
        if ((passaporte == user.passaporte)&&(id[0] != user.id)) return res.render('users/admin/edit',{
            user: req.body,
            papeis,
            error: "Passaporte já cadastrado!"
        })
    }
    console.log('oi')
    next()
}

async function remove(req, res, next) {
    const userId = req.session.userId
    const user = await User.findOne({where:{id:req.body.id}})

    if (userId == user.id) return res.render('users/admin/delete-error')

    req.user = user
    next()
}

module.exports = {
    show,
    post,
    edit,
    update,
    remove
}