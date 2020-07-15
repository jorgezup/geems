const User = require('../models/User');
const Papel = require('../models/Papel');

module.exports = {
    async index(req, res) {
        const user = await User.findByPk(req.session.userId, {
            include:{model: Papel, as:'papel'},
            raw:true
        })

        const papeis = await Papel.findAll({raw:true})

        console.log(user)

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
    }
}