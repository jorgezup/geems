const User = require("../models/User")

async function onlyUsers(req, res, next) {
    if (!req.session.userId) {
        return res.redirect('/login')
    }

    const user = await User.findOne({
        where: { id: req.session.userId}
    })

    req.user = user

    next() 
}

async function isLoggedRedirect(req, res, next) {
    if (req.session.userId) {
        const user = await User.findOne({
            where: { id: req.session.userId}
        })

        return res.render('index')
    }

    next()
}

async function verifyIsAdmin(req, res, next) {
    const isAdmin = req.user.is_admin 

    req.isAdmin = isAdmin

    next()
}

async function isAdmin(req, res, next) {
    const user = await User.findOne({
        where: { id:req.session.userId }
    })

    if (!user.is_admin) return res.render('index', {
        error: 'Acesso negado!'
    })

    req.user = user 
    
    next()
}

module.exports = {
    onlyUsers,
    isLoggedRedirect,
    verifyIsAdmin,
    isAdmin
}