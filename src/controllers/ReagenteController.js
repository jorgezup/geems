const { Op, fn, col } = require('sequelize')
const Reagente = require('../models/Reagente')
const Consumo = require('../models/Consumo')
const Orgao = require('../models/Orgao')
const Local = require('../models/Local')


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
    async create(req, res) {
        const orgaos = await Orgao.findAll({attributes:['id', 'nome'], raw:true})
        const locais = await Local.findAll({attributes:['id', 'nome'], raw:true})

        return res.render('reagentes/create', {orgaos, locais})
    },
    async find(req, res) {
        try {
            const { id } = req.params

            let reagente = await Reagente.findOne({
                where: {id},
                attributes: [
                    'id',
                    'nome_oficial',
                    'nome_comum',
                    'formula_molecular',
                    'marca',
                    'lote',
                    'controlado',
                    'orgao_controle_id',
                    [fn('TO_CHAR', col('validade'), 'DD-MM-YYYY'), 'validade']
                ], 
                raw: true
            })
            
            if (reagente.orgao_controle_id) {
                reagente.orgao = await Orgao.findOne({where:{id:reagente.orgao_controle_id}, raw:true})
            }
            
            return res.render('reagentes/show.pug', { reagente })
        } catch (error) {
            console.error
            return res.render('reagentes/show', {
                error: 'Erro inesperado'
            })
        }
    },
    async store(req, res) {
        try {
            let { 
                nome_comum,
                nome_oficial,
                formula_molecular,
                marca,
                lote,
                validade,
                estado,
                quantidade,
                local_armazenamento_id,
                incompatibilidade,
                controlado,
                orgao_controle_id,
                info_adicionais 
            } = req.body

            if(orgao_controle_id=='')
                orgao_controle_id=null

            let reagente = await Reagente.create({ 
                nome_comum,
                nome_oficial,
                formula_molecular,
                marca,
                lote,
                validade,
                estado,
                quantidade,
                local_armazenamento_id,
                incompatibilidade,
                controlado,
                orgao_controle_id,
                info_adicionais, 
                created_by_user_id: req.session.userId
            })
       
            return res.redirect('/reagentes/list')
        } catch (error) {
            console.error
            return res.render('reagentes/list', {
                error: 'Erro inesperado'
            })
        }
    },
    async edit(req, res) {
        try {
            const { id } = req.params
            const isAdmin = req.user.is_admin

            const reagente = await Reagente.findByPk(id, {
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
                    'local_armazenamento_id',
                    'incompatibilidade',
                    'controlado',
                    'orgao_controle_id',
                    'info_adicionais'
                ],
                raw:true
            })

            const orgaos = await Orgao.findAll({attributes:['id', 'nome'], raw:true})
            const locais = await Local.findAll({attributes:['id', 'nome'], raw:true})

            return res.render('reagentes/edit', {reagente, orgaos, locais, isAdmin})
        } catch (error) {
            console.error
            return res.render('reagentes/edit', {
                error: 'Erro inesperado'
            })
        }
    },
    async update(req, res) {
        try {
            let { 
                nome_comum,
                nome_oficial,
                formula_molecular,
                marca,
                lote,
                validade,
                estado,
                quantidade,
                local_armazenamento_id,
                incompatibilidade,
                controlado,
                orgao_controle_id,
                info_adicionais 
            } = req.body

            if(controlado == 'false') {
                orgao_controle_id = null
            }

            const id = req.body.id[0]

            let reagente = await Reagente.update({
                    nome_comum,
                    nome_oficial,
                    formula_molecular,
                    marca,
                    lote,
                    validade,
                    estado,
                    quantidade,
                    local_armazenamento_id,
                    incompatibilidade,
                    controlado,
                    orgao_controle_id,
                    info_adicionais 
                },
                {
                    where: {
                        id
                    }
                }
                
            )
            return res.redirect('/')
        } catch (error) {
            console.error
            return res.render('reagentes/list', {
                error: 'Erro inesperado'
            })
        }
    },
    async delete(req, res) {
        try {
            await Reagente.destroy({
                where: {
                    id: req.body.id
                }
            })

            return res.redirect('/')
        } catch (error) {
            console.error
            return res.render('reagentes/list', {
                error: 'Erro inesperado'
            })
        }
    },
}