const { Model, DataTypes } = require('sequelize')

class Papel extends Model {
    static init(sequelize) {
        super.init({
            nome: DataTypes.STRING,
        }, {
            sequelize,
            tableName:'roles'
        })
    }
}

module.exports = Papel;