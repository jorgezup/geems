const { Op, fn, col } = require('sequelize')
const Reagente = require('../models/Reagente')

module.exports = {
    async index(req, res){
        let { filter, page, limit }  = req.query

        page = page || 1
        limit = limit || 5
        let offset = limit * (page - 1)

        if (filter) {
            let total = await Reagente.count({
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
                }
            })

            const reagentes = await Reagente.findAll({
                // attributes: ['nome_oficial', 'marca', 'controlado', 'quantidade', 'validade'],
                attributes: [
                    'id', 'nome_oficial', 'marca', 'controlado', 'quantidade'],
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
                limit: limit,
                offset: offset
                // order:[['nome_oficial', 'DESC']],
            })

            let mathTotal = total == undefined ? 0 : Math.ceil(total/limit)
            
            const pagination = {
                total: mathTotal,
                page
            }
            
            console.log(pagination)
            return res.render('Reagentes/list.pug', { reagentes, pagination, filter })
        }

        const total = await Reagente.count()

        const reagentes = await Reagente.findAll({
            attributes: ['id', 'nome_oficial', 'marca', 'controlado', 'quantidade'],
            limit: limit,
            offset: offset,
            group: 'id',
        })

        let mathTotal = total == undefined ? 0 : Math.ceil(total/limit)
            
        const pagination = {
            total: mathTotal,
            page
        }
        
        console.log(pagination)
        return res.render('Reagentes/list.pug', { reagentes, pagination })
    },
    async orderByName(req, res){
        
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

        const reagente = await Reagente.findByPk(id,
            {
                attributes: [
                    'id',
                    'nome_oficial',
                    'nome_comum',
                    'formula_molecular',
                    'marca',
                    'lote',
                    'controlado',
                    'orgao',
                    [fn('TO_CHAR', col('validade'), 'DD-MM-YYYY'), 'validade']
                ]
            }
        )
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
                attributes: [
                    'id',
                    'nome_oficial',
                    'nome_comum',
                    'formula_molecular',
                    'marca',
                    'lote',
                    [fn('TO_CHAR', col('validade'), 'YYYY-MM-DD'), 'validade'],
                    'estado',
                    'quantidade',
                    'localizacao',
                    'incompatibilidade',
                    'controlado',
                    'orgao',
                    'info_adicionais'
                ]
            }
        )

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