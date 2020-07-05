const User = require("../models/User")
const { compare } = require("bcrypt")

async function login(req, res, next) {
    const { email, password } = req.body 
    console.log(email)
    
    const user = await User.findOne({
        where: { email }
    })
    console.log(req.body)

    if (!user || user == null) return res.render('session/login', {
        user: req.body,
        error: 'Usuário não cadastrado.'
    })

    const passed = await compare(password, user.password)

    if (!passed) return res.render('session/login', {
        user: req.body,
        error: "Senha incorreta."
    })

    req.user = user

    next()
}

module.exports = {
    login
}