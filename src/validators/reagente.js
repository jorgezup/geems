const Reagente = require("../models/Reagente")

function checkAllFields(body) {
    const keys = Object.keys(body)
    for(let key of keys) {
        if (body[key] == "" && key != 'formula_molecular' && 
        key != 'lote' && key != 'incompatibilidade' && key != 'orgao_controle_id'
        && key != 'info_adicionais') return {
            reagente: body,
            error: "Preencha os campos obrigatórios."
        }
    }
}

async function show(req, res, next) {
    const { id } = req.params
    const reagente = await Reagente.findOne({
        where: { id }
    })

    if (!reagente) return res.render('./not-found')

    req.reagente = reagente

    next()
}

async function post(req, res, next) {
    const fillAllFields = checkAllFields(req.body)
    console.log(req.body)

    if (fillAllFields) return res.send('Por Favor Preencha os campos obrigatórios')

    next()
}

module.exports = {
    show,
    post
}