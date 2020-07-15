const { Model, DataTypes } = require('sequelize')

class Orgao extends Model {
    static init(sequelize) {
        super.init({
            nome: DataTypes.STRING,
        }, {
            sequelize,
            tableName:'orgaos'
        })
    }
    static associate(models) {
        this.hasMany(models.Reagente, { as: 'reagentes'})
    }
}

module.exports = Orgao;