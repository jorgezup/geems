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

async function isAdmin(req, res, next) {
    const user = await User.findOne({
        where: { id:req.session.userId }
    })
    console.log(user.is_admin)

    if (user.is_admin == false) {
        req.isAdmin = user.is_admin
        return res.render('access-denied')
    }

    req.user = user 
    
    next()
}

module.exports = {
    onlyUsers,
    isLoggedRedirect,
    isAdmin
}