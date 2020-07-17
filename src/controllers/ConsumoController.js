const Consumo = require('../models/Consumo')
const Reagente = require('../models/Reagente')

module.exports = {
    async find(req, res) {
        const { reagente_id } = req.params

        let reagente = await Reagente.findByPk(reagente_id)

        if(!reagente) return res.render('not-found')

        let quantidade_consumida = 0

        const consumo = await Consumo.findAll({
            where: {
                reagente_id
            }
        })

        if(consumo) {
            consumo.forEach(element => {
                quantidade_consumida += Number(element.dataValues.quantidade_consumida)
            });
        }

        reagente.quantidade_consumida = quantidade_consumida
        reagente.quantidade_final = reagente.quantidade - quantidade_consumida

        
        return res.render('reagentes/consumo', {reagente})
    },
    async store(req, res) {
        try {
            const { reagente_id } = req.params
            const { quantidade_consumida } = req.body

            const reagente = await Reagente.findByPk(reagente_id)

            if(!reagente) return res.render('not-found')

            const consumo = await Consumo.create({
                quantidade_consumida: Number(quantidade_consumida),
                reagente_id,
                user_id: req.session.userId
            })

            return res.redirect('/reagentes/list')
        } catch (error) {
            console.error
            return res.render('reagentes/list', {
                error: 'Erro inesperado'
            })
        }
    }
}