const { Op, fn, col } = require('sequelize')
const Reagente = require('../models/Reagente')
const Consumo = require('../models/Consumo')


async function verificaConsumo(reagente) {
    let quantidade_consumida = 0

    const consumo = await Consumo.findAll({
        where: {
            reagente_id:reagente.id
        }
    })

    if(consumo) {
        consumo.forEach(element => {
            quantidade_consumida += Number(element.dataValues.quantidade_consumida)
        });
    }

    reagente.quantidade_consumida = quantidade_consumida
    reagente.quantidade_final = reagente.quantidade - quantidade_consumida
        
    return reagente
}

module.exports = {
    async index(req, res){
        let { column, order, filter, page, limit }  = req.query
        page = page || 1
        limit = limit || 8
        let offset = limit * (page - 1)

        let total = await Reagente.count()

        
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

            await Promise.all(reagentes.map(verificaConsumo))       

            return res.render('reagentes/list.pug', { reagentes, pagination, filter, order, column })
        }
        else if (order) {
            const reagentes = await Reagente.findAll({
                attributes: ['id', 'nome_oficial', 'marca', 'controlado', 'quantidade'],
                limit: limit,
                offset: offset,
                order:[ [column, order]]
            })
            let mathTotal = total == undefined ? 0 : Math.ceil(total/limit)
            
            const pagination = {
                total: mathTotal,
                page
            }

            await Promise.all(reagentes.map(verificaConsumo))            
            
            return res.render('reagentes/list.pug', { reagentes, pagination, filter, order, column })
        }
        else {
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

            await Promise.all(reagentes.map(verificaConsumo))            

            return res.render('reagentes/list.pug', { reagentes, pagination, filter, order, column })
        }        
    },
    create(req, res) {
        return res.render('reagentes/create')
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
        return res.render('reagentes/show.pug', { reagente })

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

    
         return res.redirect('/reagentes/list')
    },
    async edit(req, res) {
        const { id } = req.params
        const isAdmin = req.user.is_admin
        console.log(isAdmin)

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

        return res.render('reagentes/edit', {reagente, isAdmin})
    },
    async update(req, res) {
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
    },
    async delete(req, res) {
        const { id } = req.body

        await Reagente.destroy({
            where: {
                id: req.body.id
            }
        })

        return res.redirect('/')
    },
}