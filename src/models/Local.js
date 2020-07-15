const { Model, DataTypes } = require('sequelize')

class Local extends Model {
    static init(sequelize) {
        super.init({
            nome: DataTypes.STRING,
        }, {
            sequelize,
            tableName:'locais'
        })
    }
}

module.exports = Local;