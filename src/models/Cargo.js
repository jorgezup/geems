const { Model, DataTypes } = require('sequelize')

class Cargo extends Model {
    static init(sequelize) {
        super.init({
            nome: DataTypes.STRING,
        }, {
            sequelize
        })
    }
}

module.exports = Cargo;