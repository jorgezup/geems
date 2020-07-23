const { Model, DataTypes } = require('sequelize')

class Consumo extends Model {
    static init(sequelize) {
        super.init({
            quantidade_consumida: DataTypes.FLOAT,
        }, {
            sequelize
        })
    }

    static associate(models) {
        this.belongsTo(models.User, { foreignKey: 'user_id', as: 'user'})
        this.belongsTo(models.Reagente, { foreignKey: 'reagente_id', as: 'reagente'})
    }
}

module.exports = Consumo;