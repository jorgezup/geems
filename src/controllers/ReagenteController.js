const { Op, fn, col } = require('sequelize')
const Reagente = require('../models/Reagente')

module.exports = {
    async index(req, res){
        const { filter }  = req.query

        if (filter) {
            const reagentes = await Reagente.findAll({
                // attributes: ['nome_oficial', 'marca', 'controlado', 'quantidade', 'validade'],
                attributes: [
                    'id', 'nome_oficial', 'marca', 'controlado', 'quantidade',
                    [fn('TO_CHAR', col('validade'), 'DD-MM-YYYY'), 'validade']
                ],
                where: {
                    [Op.or]: [{ 
                        nome_oficial: {
                            [Op.iLike]: `%${filter}%`
                        }
                    }, { 
                        nome_comum: {
                            [Op.iLike]: `%${filter}%`
                        } 
                    }],  
                }, 
                // order:[['nome_oficial', 'DESC']],
            })

            console.log(reagentes)

            return res.render('Reagentes/list.pug', { reagentes })
        }

        const reagentes = await Reagente.findAll({
            attributes: ['id', 'nome_oficial', 'marca', 'controlado', 'quantidade']
        })

        return res.render('Reagentes/list.pug', { reagentes })
    },
    async orderByName(req, res){
        
        // console.log('oi')
        const filtro  = Object.keys(req.query)[0]
        const order = Object.values(req.query)[0]
        console.log(filtro)
        console.log(order)
        if (filtro) {
            const reagentes = await Reagente.findAll({
                attributes: ['id', 'nome_oficial', 'marca', 'controlado', 'quantidade'],
                order:[ [filtro, order]]
            })
            return res.render('Reagentes/list.pug', { reagentes })

        }

    },
    async find(req, res) {
        const { id } = req.params

        const reagente = await Reagente.findByPk(id)
        console.log(reagente)

        return res.render('Reagentes/show.pug', { reagente })

    },
    async store(req, res) {
        const { 
            nome_comum,
            nome_oficial,
            formula_molecular,
            marca,
            lote,
            validade,
            estado,
            quantidade,
            localizacao,
            incompatibilidade,
            controlado,
            orgao,
            info_adicionais 
        } = req.body


        const reagente = await Reagente.create({ 
            nome_comum,
            nome_oficial,
            formula_molecular,
            marca,
            lote,
            validade,
            estado,
            quantidade,
            localizacao,
            incompatibilidade,
            controlado,
            orgao,
            info_adicionais 
         })

    
         return res.render('index.pug')
    },
    async edit(req, res) {
        const { id } = req.params

        const reagente = await Reagente.findByPk(id,
            {
                attributes: ['nome_oficial', [fn('TO_CHAR', col('validade'), 'YYYY-MM-DD'), 'validade']]
            })

        return res.render('Reagentes/edit', {reagente})
    },
    async update(req, res) {
        // const { id } = req.params

        // console.log(req.body.validade)
        const { 
            nome_comum,
            nome_oficial,
            formula_molecular,
            marca,
            lote,
            validade,
            estado,
            quantidade,
            localizacao,
            incompatibilidade,
            controlado,
            orgao,
            info_adicionais 
        } = req.body

        const id = req.body.id[0]

        const reagente = await Reagente.update(
            {
                nome_comum: nome_comum,
                nome_oficial: nome_oficial,
                formula_molecular: formula_molecular,
                marca: marca,
                lote: lote,
                validade: validade,
                estado: estado,
                quantidade: quantidade,
                localizacao: localizacao,
                incompatibilidade: incompatibilidade,
                controlado: controlado,
                orgao: orgao,
                info_adicionais: info_adicionais 
            },
            {
                where: {
                    id: id
                }
            }
            
        )
        return res.redirect('/')
    }
}